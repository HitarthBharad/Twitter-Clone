const router = require('express').Router();
let User = require('../models/user.models');

router.route('/').get((req, res) => {
  User.find()
    .then(Response => res.json(Response))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const number = 0;
  const dob = Date.parse(req.body.dob);
  const logged = req.body.logged;

  const newUser = new User({username,firstname,lastname,email,password,number,dob,logged});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;
      users.firstname = req.body.firstname;
      users.lastname = req.body.lastname; 
      users.email = req.body.email;
      users.password = req.body.password;
      users.number = Number(req.body.number);
      users.dob = Date.parse(req.body.dob);
      users.logged = req.body.logged;

      users.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;