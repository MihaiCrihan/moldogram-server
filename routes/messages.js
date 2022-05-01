const express = require("express");
const router = express.Router();
const Messages = require("../models/Messages");

const items = Array(10)
  .fill(0)
  .map((_, index) => ({
    isOwner: 0,
    messageContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  }));

router.get("/:id", function(req, res, next) {
  res.send(
    JSON.stringify(items.find(item => item.id === Number(req.params.id)))
  );
});

router.get("/", async (req, res) => {
  res.send(JSON.stringify(await Messages.find({})));
});

router.patch("/:id", async (req, res) => {
  await Messages.updateOne({ id: req.params.id }, req.body);

  res.sendStatus(200);
});

router.post("/", async (req, res) => {
  await Messages.create(req.body);
  res.sendStatus(200);
});

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const postIndex = items.findIndex((item) => item.id === Number(id));
//   this.items.splice(postIndex, 1);
//   res.sendStatus(200);
// });

module.exports = router;
