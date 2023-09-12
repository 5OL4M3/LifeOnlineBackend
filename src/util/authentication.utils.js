const validator = require("email-validator");

function isValidSignup(body){

    let { firstName, lastName, email, username, password, re_enterPassword } = body;

    let status;
    let errorMsgs = [];

    if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || re_enterPassword === ""){
        errorMsg.push("Empty Response")
    };
  
    if (!validator.validate(email)){
        errorMsgs.push("Invalid Email")
    };
  
    if (password !== re_enterPassword){
        errorMsgs.push("Passwords do not match")
    };
  
    if (username.length < 8){
        errorMsgs.push("Username is not atleast 8 characters long")
    }

    if (password.length < 12){
        errorMsgs.push("Password is no atleast 12 characters long")
    };

    if (errorMsgs.length >= 1){
        status = false;
        console.log(errorMsgs);
    } else {
        status = true;
    }
    
    return JSON.stringify({isValid: status, Msgs: errorMsgs});
};

module.exports = { isValidSignup };

