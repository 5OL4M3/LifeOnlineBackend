const express = require("express");
const todoListRouter = require("./routes/todolist");
const authenticationRouter = require("./routes/authentication");
const gradebookRouter = require("./routes/gradebook");
require('dotenv').config();

const pgp = require('pg-promise')();
const db = pgp({
  connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOSTNAME}/${process.env.DATABASE}`,
  ssl: true,  
})
const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/todolist", todoListRouter);
app.use("/authentication", authenticationRouter);
app.use("/gradebook", gradebookRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* db.one('SELECT * FROM test')
  .then((data) => {
    console.log('DATA:', data.last_name)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  }) */