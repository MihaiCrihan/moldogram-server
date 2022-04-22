const express = require('express');
const router = express.Router();

const items = Array(10).fill(0).map((_, index)=> ({
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
}));

router.get('/:id', function(req, res, next) {
  res.send(JSON.stringify(items.find(item => item.id === Number(req.params.id))));
});

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(items));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const post = items.find(item => item.id === Number(id));

  post.likes = req.body.likes
  res.sendStatus(200)
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const postIndex = items.findIndex(item => item.id === Number(id));
  this.items.splice(postIndex, 1);
  res.sendStatus(200)
});

module.exports = router;
