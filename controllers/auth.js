const app = require('express')();

app.get('/sign-up', (req, res) => {
  res.json({
    message: "Welcome to sign-up!"
  });
});

module.exports = app;