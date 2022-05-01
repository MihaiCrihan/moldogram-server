const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const Push = require("../models/Push");

module.exports = app => {
  router.get("/", async (req, res) => {
    try {
      const response = await Posts.find({});

      if (!response.length) {
        for (let i = 1; i < 50; i++) {
          await Posts.create({
            description:
              " It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            content: `https://picsum.photos/1024?random=${i}`,
            likes: 0,
            comments: [],
            created_at: new Date().toISOString(),
            user: await Users.findOne({ _id: req.headers.authorization })
          });
        }
      }

      res.send(JSON.stringify(await Posts.find({})));
    } catch (e) {
      console.log(e);
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
      const registrationToken =
        "e4FkqV-TgKYhGwrsTg9za5:APA91bGjvGOF-KhxMievn3cMdjCh6uzPAWeeZJ5Fmyc9Onk3EP4jr2PJN9Y1Iuh6siaycCTSZMGMFnYk77RqfdYzs2tk6CSlysZRAPLzmFKO7HTzlJlJlU5pwcIyaQaZrg8AVIbArIX7";

      const user = await Users.findOne({ _id: req.headers.authorization });

      const message = {
        notification: {
          title: user.name,
          body: "Пользователь загрузил новый пост!",
          imageUrl: user.avatar
        },
        data: { token: req.headers.authorization },
        webpush: {
          fcm_options: {
            link: "https://moldogram.web.app/"
          }
        },
        token: registrationToken
      };

      // Send a message to the device corresponding to the provided
      // registration token.
      const tokens = await Push.find({});

      console.log(tokens);

      if (tokens.length) {
        app.firebase
          .messaging()
          .sendAll(tokens.map(el => ({ ...message, token: el.token })))
          .then(response => {
            console.log("Successfully sent message:", response);
          })
          .catch(error => {
            console.log("Error sending message:", error);
          });
      }

      await Posts.create({
        ...req.body,
        user: await Users.findOne({ _id: req.headers.authorization })
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  return router;
};
