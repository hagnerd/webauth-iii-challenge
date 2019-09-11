const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../controllers/users");

router.get("/", async (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, _decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "You shall not pass!"
        });
        return;
      }

      const users = await User.getAll();

      res.json({
        users
      });
    });
  } else {
    res.status(400).json({
      message: "You shall not pass!"
    });
  }
});

module.exports = router;
