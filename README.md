# MySQL 8 Application - Project Template <!-- omit in toc -->

Creating a template for a full stack web project built around MySQL 8.

- [Running the Project](#running-the-project)
- [Structure](#structure)
  - [Database / phpMyAdmin](#database--phpmyadmin)
  - [NestJS API](#nestjs-api)

## Running the Project

Run the project with the following command which creates the database and starts phpMyAdmin for database management.

```
docker-compose up --build phpmyadmin
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

### NestJS API

The [project backend](https://github.com/vlnguyen/mysql8-project-template/blob/master/api/README.md) is built on NestJS for serving the API and mikro-orm for database access.
