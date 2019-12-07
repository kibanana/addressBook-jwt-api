import express from 'express';
import path from 'path';
import config from './config';
import auth from './api/auth';
import contacts from './api/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

app.set('jwt-secret', config.jwtSecret);

app.use('api/auth', auth);
app.use('api/', contacts);

let port = 3000;
app.listen(port, function(){
  console.log("Server Starting on " + port + "!");
});
