require('dotenv').config();

const pgp = require('pg-promise')({});
const db = pgp({
  connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}`,
  ssl: true,  
});

module.exports = db;