const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

module.exports = app => {
  router.get("/", async (req, res) => {
    try {
      const response = await Users.find({});

      if (!response.length) {
        await Users.create({
          name: "User 1",
          password: "12345678",
          email: "user1@domain.com"
        });
        await Users.create({
          name: "User 2",
          password: "12345678",
          email: "user2@domain.com"
        });
      }

      res.send(JSON.stringify(await Users.find({})));
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      await Users.updateOne({ _id: req.params.id }, req.body);
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
