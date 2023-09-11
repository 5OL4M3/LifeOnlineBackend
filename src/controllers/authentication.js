//Controller for authentication application
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const db = require(`../db/index.js`);
const saltRounds = 10;
const crypto = require("crypto");

let tokenStorage = {};

let cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

const login = async (req, res) => {
  let { username, password } = req.body;

  if (username === "" || password === ""){
    return res.status(400).send("Empty Input"); 
  };

  let hashedpassword;
  try {
    let res = await db.one(`SELECT hashedpassword FROM users WHERE username = $1`, [username]);
    hashedpassword = res.hashedpassword;

  } catch (err){
    console.log(err);
    return res.status(500).send("Something went wrong with the database");
  };

  try {
    let match = await bcrypt.compare(password, hashedpassword);
    if (!match){
      return res.status(400).send("Incorrect Password");
    };

  } catch (err){
    console.log(err);
    return res.status(500).send("Inverse Hash Failed");
  };

  try {
    let token = crypto.randomBytes(32).toString("hex");
    tokenStorage[token] = {"username": username, "isAdmin": false, "loginAttempts": 0};
    return res.cookie("Token", token, cookieOptions).send("Successful Login");
  
  } catch (err){
    console.log(err);
    return res.status(500).send("Failed to create session id");
  }
};

const signup = async (req, res) => {
  let { firstName, lastName, email, username, password, re_enterPassword } = req.body;

  if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || re_enterPassword === ""){
    return res.status(400).send("Empty input");
  };

  if (!validator.validate(email)){
    return res.status(400).send("Not a valid Email");
  };

  if (password !== re_enterPassword){
    return res.status(400).send("Passwords do not match");
  };

  if (username.length <= 8 || password.length < 12){
    return res.status(400).send("Inputs not long enough");
  };

  try {
    let result = await db.oneOrNone(`SELECT * FROM users WHERE username = $1`, [username]);
    if (result !== null){
      return res.status(500).send("Username Already exists")
    };

  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong with the database")
  };

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, saltRounds);

  } catch (err){
    console.log(err);
    return res.status(500).send("Could not Hash password");
  };

  try {
    let response = await db.any(`INSERT INTO users (firstname, lastname, email, username, hashedpassword) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [firstName, lastName, email, username, hashPassword]);
    return res.send(response);

  } catch (err){
    console.log(err);
    return res.status(500).send("Could not add user");
  };
};

const logout = async (req, res) => {
  let body = req.body;
  return res.send("Good")
};

module.exports = { login, signup, logout };