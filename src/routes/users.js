const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "get /api/users"
  });
});

module.exports = router;
