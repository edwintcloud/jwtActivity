const express = require('express');
const app = express();
const authController = require('./controllers/auth');

// configure express to use json
app.use(express.json());

// base routes
app.get('/', (req,res) => {
  res.json({
    message: "Welcome to jwtActivity 🎉!"
  })
});

// configiure express to use controllers
app.use(authController);

// catch all not found and return json error
app.all('*', (req, res) => {
  res.status(400);
  res.json({
    error: `Invalid request - ${req.method} ${req.url}`
  });
});

// run our server
app.listen(5000, () => {
  console.log("App running on localhost:5000");
});