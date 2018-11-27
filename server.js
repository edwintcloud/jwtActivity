require('dotenv').config();
const express = require('express');
const app = express();
const authController = require('./controllers/auth');
const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect(`mongodb://localhost/${process.env.npm_package_name}`, { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.log('\x1b[31m%s\x1b[0m', error.message.substr(error.message.lastIndexOf('['), error.message.length));
});

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