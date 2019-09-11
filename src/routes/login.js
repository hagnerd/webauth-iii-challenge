const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../controllers/users");

function validateUserInput(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: "Expected username and password"
    });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id
  };

  const secret = process.env.SECRET || "supersecret";
  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret, options);
}

router.post("/", validateUserInput, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.json({
        token
      });
    } else {
      res.status(401).json({
        message: "You shall not pass!"
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal server errors",
      message: err.message
    });
  }
});

router.get("/", (req, res) => {
  res.json({
    message: "You got /api/login"
  });
});

module.exports = router;
