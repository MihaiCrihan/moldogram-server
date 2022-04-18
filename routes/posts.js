var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(Array(10).fill(0).map((_, index)=> ({
    id: index,
    user: {
      name: "5343543",
      avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    content: "https://picsum.photos/1920",
    description: "testsetrseresrfsd",
    likes: 5,
    comments: [
      {
        author: {
          name: "Bumbac Marin",
          avatar: "https://picsum.photos/200"
        },
        content: "Lorem ipsum stil dolore amet",
        likes: 6,
        created_at: "12.12.2020"
      },
      {
        author: {
          name: "Crihan Mihai",
          avatar: "https://picsum.photos/200"
        },
        content: "sa presupunem ca este un comentariu",
        likes: 23,
        created_at: "12.12.2020"
      }
    ],
    created_at: "12.12.2020"
  }))));
});

module.exports = router;
