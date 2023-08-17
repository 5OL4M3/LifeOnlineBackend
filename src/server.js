let express = require("express");
let { Pool } = require("pg");
let argon2 = require("argon2");
let crypto = require("crypto");
let env = require("../env.json");
let hostname = "localhost";
let port = 3000;

let app = express();
let pool = new Pool(env);


app.use(express.static(__dirname + "/public"));
app.use(express.json());

pool.connect().then(() => {
    console.log(`Connected to postgres Database: ${env.database}`);
})

app.post("/login", async (req, res) => {
    let { username, password } = req.body;

    if (!isValidLogin(username, password)){
        return res.status(400).json({error: "Login Attempt Failed!"});
    }


    res.json({url: "none"});
})

app.post('/create', async (req, res) => {
    res.json();
})

function isValidLogin(user, pass){
    if (user >= 50 || user >= 50){
        return false;
    };

    if (user === '' || pass === ''){
        return false
    }

    return true;
}

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});