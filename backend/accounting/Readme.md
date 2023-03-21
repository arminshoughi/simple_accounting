## Installation Guide

To creating main database for project, do following steps:

```bash
$ sudo su - postgres
$ psql

CREATE DATABASE accounting_db;
CREATE USER accounting_user WITH PASSWORD 'accounting_password@';
ALTER ROLE accounting_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE accounting_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE accounting_db TO accounting_user;
\q
exit;
```

And for test database, we should create a database `bonyadehsan_testdb` and give proper
access to it's user `bonyadehsan_testuser` to be able to also create database.

```
$ sudo su - postgres
$ psql

CREATE DATABASE bonyadehsan_testdb;
CREATE USER bonyadehsan_testuser WITH PASSWORD 'bonyadehsanPassword@';
ALTER ROLE bonyadehsan_testuser SET client_encoding TO 'utf8';
ALTER ROLE bonyadehsan_testuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE bonyadehsan_testuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE bonyadehsan_testdb TO bonyadehsan_testuser;
ALTER USER bonyadehsan_testuser CREATEDB;
\q
```
