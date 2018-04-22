// require necessary packages and files
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const privates = require('./config/privates');

// set public path and port
const publicPath = path.join(__dirname, 'client', 'public');
const port = process.env.PORT || 5000;

// connect to mongodb server
mongoose.connect(privates.mongodbURI);

// init express app and set middleware
const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set all routes to be served with index.html for SPAs
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// listen to given port
app.listen(port, () => console.log(`SERVER RUNNING ON ${port}...`));