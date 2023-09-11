//Routes for authentication application

const { login, signup, logout } = require("../controllers/authentication.js");

const { Router } = require('express');
const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;