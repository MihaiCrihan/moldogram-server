var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(Array(10).fill(0).map((_, index)=> ({
    id: index,
    user: {
      name: "5343543",
      avatar: "5435"
    },
    content: "https://picsum.photos/1920",
    description: "testsetrseresrfsd",
    likes: 5,
    comments: [
      {
        author: {
          name: "5343543",
          avatar: "https://picsum.photos/200"
        },
        content: "655464",
        likes: 6,
        created_at: "12.12.2020"
      }
    ],
    created_at: "12.12.2020"
  }))));
});

module.exports = router;
