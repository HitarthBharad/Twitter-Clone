const router = require('express').Router();
let Profile = require('../models/profile.models');

router.route('/').get((req, res) => {
  Profile.find()
    .then(Response => res.json(Response))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const username = req.body.username;
  const following = req.body.following;
  const follower = req.body.follower;
  const bio = req.body.bio;
  const mytwit = req.body.mytwit;

  const newProfile = new Profile({userid,username,following,follower,bio,mytwit});

  newProfile.save()
    .then(() => res.json('Profile added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Profile.find({userid:req.params.id})
      .then(Course => res.json(Course))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Profile.findById(req.params.id)
      .then(Course => {
        Course.userid= req.body.userid;
        Course.username = req.body.username;
        Course.following = req.body.following;
        Course.follower = req.body.follower;
        Course.bio = req.body.bio;
        Course.mytwit = req.body.mytwit;
  
        Course.save()
        .then(() => res.json('Profile Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: '+err));
  });

module.exports = router;