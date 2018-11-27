const app = require('express')();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

app.get('/sign-up', (req, res) => {
  res.json({
    message: "Welcome to sign-up!"
  });
});

// create a user and send them an authorized jwt token
app.post('/sign-up', (req, res) => {
  // create user
  user.create(req.body).then(user => {
    // create jwt token
    const token = jwt.sign({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }, process.env.JWT_SECRET);
    // send jwt to client
    res.json({
      message: token
    });
  }).catch(err => {
    res.json({
      "error": `Unable to create user - ${err.message}`
    });
  });
});

// login a user and send them an authorized jwt token
app.post('/login', (req, res) => {
  user.authenticate(req.body.email, req.body.password).then(user => {
    // create jwt token
    const token = jwt.sign({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }, process.env.JWT_SECRET);
    // send jwt to client
    res.json({
      message: token
    });
  }).catch(err => {
    res.json({
      error: `Unable to login user - ${err.message}`
    });
  });
});

module.exports = app;