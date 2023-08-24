//Controller for authentication application

const login = async (req, res) => {
  let { username, password } = req.body;

  if (!isValidLogin(username, password)){
      return res.status(400).json({error: "Login Attempt Failed!"});
  }

  res.json({url: "none"});
}

const signup = async (req, res) => {
  res.json();
}

module.exports = { login, signup };