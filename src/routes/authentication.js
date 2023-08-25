//Routes for authentication application

const { login, signup } = require("../controllers/authentication.js");

const { Router } = require('express');
const router = Router();

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;