const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const taskRoutes = require('./config/routes');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);



mongoose.connect('mongodb://localhost/restfulApidb');
const models_path = path.join(__dirname, './models');

fs.readdirSync(models_path).forEach((file) => {
  if (file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});


// express CORS
app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});



app.use((req, res, next) => {
  const error = new Error("File not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
