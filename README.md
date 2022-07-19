# MySQL 8 Application - Project Template <!-- omit in toc -->

Creating a template for a full stack web project built around MySQL 8.

- [Running the Project](#running-the-project)
  - [Database / phpMyAdmin](#database--phpmyadmin)

## Running the Project

Run the project with the following command which creates the database and starts phpMyAdmin for database management.

```
docker-compose up --build phpmyadmin
```

### Database / phpMyAdmin

The database runs on MySQL 8 with phpMyAdmin setup for database management.

On startup, scripts in the `/db/sql-to-restore` folder are executed in order, which can be used to create and populate tables for local development.

The database is accessible on the standard MySQL ports at `localhost:3306` and `localhost:33060` depending on what client you're connecting with.

- The default `root` password is `rootpassword`.
- The default user is `appuser` and its password is `appuserpassword`.
