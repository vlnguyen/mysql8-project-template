# NestJS API <!-- omit in toc -->

The project backend is built on NestJS for serving the API and mikro-orm for database access. The class structure is based around [IDesign](https://medium.com/nmc-techblog/software-architecture-with-the-idesign-method-63716a8329ec) to separate responsibilities into different levels.

- [Running the Project](#running-the-project)
- ['IDesign' Design Pattern](#idesign-design-pattern)
  - [Layered Architecture](#layered-architecture)
    - [Managers](#managers)
    - [Engines](#engines)
    - [Handlers](#handlers)
- [Dependency Injection](#dependency-injection)
  - [Swapping Handler Implementations](#swapping-handler-implementations)
  - [Mocking Functions for Testing](#mocking-functions-for-testing)
- [Session Management](#session-management)
  - [Reading Session](#reading-session)
  - [Updating Session](#updating-session)
  - [Clearing Session](#clearing-session)

## Running the Project

Run `npm install` to install all dependencies. Then run one of the following to start the project.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API is available on `localhost:8080/api`. The SQL database and Redis store must be running in order for data access and session management to work.

## 'IDesign' Design Pattern

### Layered Architecture

The backend instructure is divided into 3 levels: managers, engines, handlers.

#### Managers

Managers are responsible for larger workflows. A rule of thumb is that a user action could map to one manager function. They may leverage multiple engines to complete a workflow.

#### Engines

Engines are responsible for smaller tasks that will be used by managers. A lot of business logic is applied at this level. They depend on handlers to interact with the database.

For example, if certain fields need to be calculated before being written to the database, that would be done here so that the handler doesn't have to worry about it.

#### Handlers

Handlers are responsible purely for database access. They should not be responsible for mutating any data before being written to the database or after being read from the database.

Handlers work with generic DTOs that are used as a "common language" across the other layers.

In this example from `UserHandler.ts`, the return value of `this.userRepo.findOne()` returns an entity that is used to interact with mikro-orm. The value must be mapped to a generic `UserDto` instance before being returned so that it can be used by an engine.

```ts
@Injectable()
export class UserHandler implements IUserHandler {
  private userRepo: SqlEntityRepository<User>;
  constructor(em: EntityManager) {
    this.userRepo = em.getRepository(User);
  }

  async getUser(id: number): Promise<UserDto | null> {
    return mapToUserDto(
      await this.userRepo.findOne({ id }, { populate: ['posts'] }),
    );
  }
}
```

## Dependency Injection

The API is constructed with a series of modules that encapsulate resources that the application will request and resolve primarily through constructor injection.

```ts
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    SessionModule,
    UserModule,
    AppModule,
    PostModule,
  ],
})
export class ApiModule {}
```

Each of these modules is responsible setting up managers, engines, and handlers for injection.

Using `User.module.ts` as an example, there are a list of providers that are set. The `provide` is a `string` key and `useClass` is a class reference that should be injected.

```ts
@Module({
  controllers: [UserController],
  providers: [
    { provide: IUserHandlerProvider, useClass: UserHandler },
    { provide: IUserEngineProvider, useClass: UserEngine },
    { provide: IUserManagerProvider, useClass: UserManager },
  ],
})
export class UserModule {}
```

Dependencies can be injected with the `@Inject()` decorator into other classes. Below is an example in `user.controller.ts` of the user manager instance being injected into the controller.

```ts
@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserManagerProvider) private readonly userManager: IUserManager,
  ) {}
}
```

The value that goes into `@Inject()` is a `string` key that matches the `provide` key from the providers list in `app.module.ts`. The class that's provided from `useClass` is what's injected into the constructor parameters for the class that's injecting it.

### Swapping Handler Implementations

Because handlers have interfaces to define their expected function in addition to returning generic DTO then their implementations can be swapped at any time. For example, to switch to Sequelize, only the handler layer would need to be rewritten.

### Mocking Functions for Testing

Because managers and engines resolve their dependencies through their constructors then we can simplify testing by providing mocked instances of their dependencie directly into their constructors.

## Session Management

Sessions are controlled with the `express-session`, `Redis`, and `connect-redis` packages.

### Reading Session

Session values can be passed through function parameters with the `@Session()` dectorator.

```ts
@Get()
getSession(@Session() session: ISessionData) {
  return {
    visits: session.visits ?? null,
  };
}
```

### Updating Session

Session values can be mutated by assigning values directly to properties on the `session` parameter.

```ts
@Post()
setSessionVisits(@Session() session: ISessionData) {
  const { visits } = session;
  const newVisits = visits ? visits + 1 : 1;
  session.visits = newVisits;
  return { newVisits };
}
```

### Clearing Session

Clearing session requires leveraging the `Request` type from `express` to access the `destroy()` function on the session.

```ts
@Post('clear')
clearSession(@Req() request: Request) {
  let message = 'Successfuly cleared session.';
  request.session.destroy((e) => (message = e.message));
  return { message };
}
```
