const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const Users = require("../models/Users");

router.get("/", async (req, res) => {
  try {
    res.send(JSON.stringify(await Posts.find({})));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await Posts.updateOne({ _id: req.params.id }, req.body);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    await Posts.create({
      ...req.body,
      user: await Users.findOne({ _id: req.headers.authorization })
    });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
