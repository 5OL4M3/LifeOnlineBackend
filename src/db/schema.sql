\c lifeonline_rfq7

DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50) NOT NULL,
    username varchar(100) NOT NULL UNIQUE,
    hashedPassword varchar(100) NOT NULL
);
