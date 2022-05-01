const express = require("express");
const router = express.Router();
const Push = require("../models/Push");

router.post("/", async (req, res) => {
  try {
    await Push.create(req.body);
    res.status(200).send("");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
