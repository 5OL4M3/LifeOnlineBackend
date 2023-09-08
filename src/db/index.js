require('dotenv').config();
const initOptions = {
    connect(e) {
      const cp = e.client.connectionParametres;
      console.log("Connecting to Database:", cp.database);
    }
};

const pgp = require('pg-promise')({});
const db = pgp({
  connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}`,
  ssl: true,  
});

module.exports = db;