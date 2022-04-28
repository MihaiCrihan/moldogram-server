const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.post("/login", async (req, res) => {
  try {
  const response = await Users.findOne(req.body);
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(500).send({
        message: "Неправильный логин!"
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
