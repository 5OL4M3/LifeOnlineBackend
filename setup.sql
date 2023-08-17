DROP DATABASE IF EXISTS lifeonline;
CREATE DATABASE lifeonline;
\c lifeonline
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);