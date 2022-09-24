FROM mysql:8.0
ENV LANG=C.UTF-8

COPY ./sql-to-restore/*.sql /docker-entrypoint-initdb.d/

EXPOSE 3306 33060
