const express = require('express');
const router = express.Router();

const items = Array(10).fill(0).map((_, index)=> ({
  id: index,
  user: {
    name: "5343543",
    avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
  },
  content: "some string",
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
