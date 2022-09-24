# MySQL 8 Application - Project Template <!-- omit in toc -->

Creating a template for a full stack web project built around MySQL 8.

- [Running the Project](#running-the-project)
- [Structure](#structure)
  - [Database / phpMyAdmin](#database--phpmyadmin)
  - [Redis](#redis)
  - [NestJS API](#nestjs-api)
- [Functionality](#functionality)
  - [Reaching the API](#reaching-the-api)
    - [GET /api](#get-api)
  - [Getting a User](#getting-a-user)
    - [GET /api/user/:id](#get-apiuserid)
  - [Using Session](#using-session)
    - [GET /api/session](#get-apisession)
    - [POST /api/session](#post-apisession)
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

The database is accessible on the standard MySQL ports at `localhost:3306` and `localhost:33060` depending on what client you're connecting with.

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

You can validate the database and session connections with a limited number of API endpoints with something like Postman or by making manual `curl` requests.

### Reaching the API

#### GET /api

Returns a "Hello, World!" message if the API is running.

### Getting a User

#### GET /api/user/:id

Returns a user fromm the database with a specified id. Initially the database is only populated with 4 users. Accessing a user with an invalid id should return `null`.

### Using Session

#### GET /api/session

Returns session values for the current client.

#### POST /api/session

Updates session values for the current client. Increments the session value `visits` by 1 for each time the endpoint is hit.

#### DELETE /api/session

Clears session for the current client.
