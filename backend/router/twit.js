const router = require('express').Router();
let Twit = require('../models/twit.models');

router.route('/').get((req, res) => {
  Twit.find()
    .then(Response => res.json(Response))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const username = req.body.username;
  const content = req.body.content;
  const like = req.body.like;
  const comment = req.body.comment;
  const newTwit = new Twit({userid,username,content,like,comment});

  newTwit.save()
    .then(() => res.json('Posted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Twit.find({userid:req.params.id})
      .then(Course => res.json(Course))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/get/:id').get((req, res) => {
    Twit.findById(req.params.id)
      .then(Course => res.json(Course))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/user/:id').get((req, res) => {
    Twit.find({userid:req.params.id})
      .then(Course => res.json(Course))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Twit.findById(req.params.id)
      .then(Course => {
        Course.userid= req.body.userid;
        Course.username = req.body.username;
        Course.content = req.body.content;
        Course.like = req.body.like;
        Course.comment = req.body.comment;
  
        Course.save()
        .then(() => res.json('Tweet Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: '+err));
  });

router.route('/delete/:id').delete((req,res) => {
  Twit.findByIdAndDelete(req.params.id)
  .then(() => res.json('Tweet Deleted'))
  .catch(err=> res.status(400).json(err))
})
  

module.exports = router;