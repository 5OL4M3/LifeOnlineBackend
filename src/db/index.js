require('dotenv').config();
const { createClient } = require("redis");
const pgp = require('pg-promise')({});

const postgres = pgp({
  connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}`,
  ssl: true,  
});

const redis = createClient({
  url: ``
});

module.exports = { postgres, redis };