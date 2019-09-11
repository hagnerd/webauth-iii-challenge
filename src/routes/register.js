const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../controllers/users");

const secret = process.env.SECRET || "supersecret";

function validateUserInput(req, res, next) {
  const { username, password, department } = req.body;

  if (!username || !password || !department) {
    res.status(400).json({
      message: "Expected username, password and department"
    });
  } else {
    next();
  }
}

router.post("/", validateUserInput, async (req, res) => {
  const { username, password: rawPassword, department } = req.body;

  const password = bcrypt.hashSync(rawPassword, 12);

  try {
    const user = await User.createUser({ username, password, department });

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "8h" });

    res.status(201).json({
      token
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
});

router.get("/", (_req, res) => {
  res.json({
    message: "get /api/register"
  });
});

module.exports = router;
