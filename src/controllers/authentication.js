//Controller for authentication application
const bcrypt = require('bcrypt');
const { postgres, redis }= require(`../db/index.js`);
const saltRounds = 12;
const crypto = require("crypto");
const { isValidSignup } = require("../util/authentication.utils.js")

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

  let hashedPassword;
  try {
    let res = await postgres.one(`SELECT hashedpassword FROM users WHERE username = $1`, [username]);
    hashedPassword = res.hashedpassword;

  } catch (err){
    console.log(err);
    return res.status(500).send("Something went wrong with the database");
  };

  try {
    let match = await bcrypt.compare(password, hashedPassword);
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

  let { isValid, Msg } = JSON.parse(isValidSignup(req.body));
  // console.log(isValid);
  // console.log(Msg);
  if (!isValid){
    return res.status(400).send(Msg);
  }

  let { email, username, password } = req.body;
  // console.log(req.headers);

  // Check if email already used by another user
  try {
    let result = await postgres.any(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result !== null){
      return res.status(400).send("Email is already in use")
    };

  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong with the database")
  };

  // Check if username is already being used
  try {
    let result = await postgres.any(`SELECT * FROM users WHERE username = $1`, [username]);
    if (result !== null){
      return res.status(400).send("Username Already exists")
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
    let response = await postgres.any(`INSERT INTO users (firstname, lastname, email, username, hashedpassword) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [firstName, lastName, email, username, hashPassword]);
    return res.send(response);

  } catch (err){
    console.log(err);
    return res.status(500).send("Could not add user");
  };
};

const logout = async (req, res) => {
  let { token } = req.cookies;

  if (token === undefined) {
      return res.status(400).send("already logged out");
  }
  if (!tokenStorage.hasOwnProperty(token)) {
      return res.status(400).send("Token Does not exist");
  }
  delete tokenStorage[token];
  return res.clearCookie("token", cookieOptions)
};

module.exports = { login, signup, logout };