# MySQL 8 Application - Project Template <!-- omit in toc -->

Creating a template for a full stack web project built around MySQL 8.

## Author's Notes

My main goal with this template was to solve a minimum set of requirements.
- Use Typescript where it's possible
- Build an API that uses a layered architecture w/ depdendency injection
- Implement an ORM that simplifies database access that supports MySQL 8
- Have simple session management with a reliable store (Redis)
- Serve the API and client through the same hostname (reverse proxy?)
- Deployment with an easy way to set different environment variables

I also have a set of stretch goals that I'm unsure about only because it deals with domains that I'm unfamiliar with.
- Containerization to simplify serving both the server and client
- Auto-documentation through something like Swagger
- Using GitHub Actions for continuous deployment
- Integrating tests in the deployment pipeline
- Server and client logging

This is more or less a repo that represents the culmination of knowledge I've accumulated doing both professional and hobby development for the past 3 years. This project isn't necessarily meant to be copied as-is but serves more like a documentation of things I've learned that I think was worth sharing.

Knowing the pace that web development moves there's uncertainty how long these patterns will hold up. For now I'm happy with what I've been able to put together, and I hope it's as useful for someone else as it is for me!

- [Author's Notes](#authors-notes)
- [Running the Project](#running-the-project)
- [Structure](#structure)
  - [Database / phpMyAdmin](#database--phpmyadmin)
  - [Redis](#redis)
  - [NestJS API](#nestjs-api)
- [Functionality](#functionality)
  - [Using the React Client](#using-the-react-client)
    - [Logging In](#logging-in)
    - [User Session](#user-session)
  - [Reaching the API](#reaching-the-api)
    - [GET /api](#get-api)
    - [GET /api/user/:id](#get-apiuserid)
    - [GET /api/session](#get-apisession)
    - [POST /api/session/login](#post-apisessionlogin)
    - [POST /api/session/logout](#post-apisessionlogout)
    - [POST /api/session/visit](#post-apisessionvisit)
    - [DELETE /api/session](#delete-apisession)

## Running the Project

Run the project with the following command which creates the database and starts phpMyAdmin for database management, as well as the Redis store for session management.

```
docker-compose up --build redis phpmyadmin
```

Start the API for local development with the following commands.

```
cd api
npm run start:dev
```

Access the API on `localhost:8080/api`

## Structure

### Database / phpMyAdmin

The database runs on MySQL 8 with phpMyAdmin setup for database management.

On startup, scripts in the `/db/sql-to-restore` folder are executed in order, which can be used to create and populate tables for local development.

The database is accessible on the standard MySQL ports at `localhost:3306` and `localhost:33060` depending on what client is being used to connect.

- The default `root` password is `rootpassword`.
- The default user is `appuser` and its password is `appuserpassword`.

### Redis

The Redis cache is used primarily for session management. It is hosted on `localhost:6379` and the default password is set to `redispassword`.

It is possible to access the Redis instance directly through Docker by opening the CLI for the container and running the following.

```sh
redis-cli
AUTH redispassword
```

### NestJS API

The [project backend](https://github.com/vlnguyen/mysql8-project-template/blob/master/api/README.md) is built on NestJS for serving the API and mikro-orm for database access. The backend leverages `express-session` using `Redis` as a store for session management.

## Functionality

Database and session connection can be validated with a limited number of API endpoints with something like Postman or by making manual `curl` requests.

### Using the React Client

Core functionality of the entire stack from the API endpoints to the database and Redis store can be tested on the React client.

#### Logging In

The password for every user is `password`. The valid usernames are `Vincent`, `Tommy`, `Logan`, and `Trevor`. 

After logging in the page should display a greeting for whoever logged in.

#### User Session

User sessions depend on a browser cookie and Redis to persist client state even if the client is closed and reopened, assuming that the cookie hasn't been cleared or expired.

There are three actions possible on `<SessionDisplay/>`.
- "Visit" will increase the `visits` count by 1.
- "Logout" should only be visible if a user is logged in and should remove `userId` from the session without modifying the `visits` count.
- "Clear Session" should empty the session. If a user is logged in then they will be logged out.

### Reaching the API

Functionality of the API can be tested without the client through something like Postman or manually through `curl`.

#### GET /api

Returns a "Hello, World!" message if the API is running.


#### GET /api/user/:id

Returns a user from the database with a specified id. Initially the database is only populated with 4 users. Accessing a user with an invalid id should return `null`.


#### GET /api/session

Returns session values for the current client.

#### POST /api/session/login

Sets the `userId` property on session if the username/password is valid.

*Note: It is expected that passwords are salted and hashed with something like `bcrypt`. This example code does not implement that.*

#### POST /api/session/logout

Logs a user out by setting the `userId` property on session to `undefined`.

#### POST /api/session/visit

Updates session values for the current client. Increments the session value `visits` by 1 for each time the endpoint is hit.

#### DELETE /api/session

Clears session for the current client.