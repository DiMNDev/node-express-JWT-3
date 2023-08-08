// Check username and password in post(login) request
// If exists?
// -> create new JsonWebToken
// -> send back to front-end

// Setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //mongoose - npm package - mongoDB - database
  //Joi - npm package
  //check in the controller

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //Just for demo, normally provided by database
  const id = new Date().getDate();

  // Try to keep the payload small, better experience for the user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(username, password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
