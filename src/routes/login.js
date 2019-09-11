const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "You got /api/login"
  });
});

module.exports = router;
