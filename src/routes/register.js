const router = require("express").Router();
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

router.post("/", validateUserInput, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.createUser({ username, password });
    console.log(user);

    res.status(201).json({
      user
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
