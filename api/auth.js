import express from 'express';
import User from '../models/user';
import * as util from '../util';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signin', (req, res, next) => {
  let inValid = true;
  let validationError = {
    name: 'ValidationError',
    errors: {}
  }

  if(!req.body.name || !req.body.password){
    isValid = false;
    validationError.errors.name = {message: 'Username or Password is required!'};
  }
  
  if(!isValid) return res.json(util.successFalse(validationError));
  else next();
}, (req, res, next) => {
  User.findOne({name: req.body.name})
  .exec((err, user) => {
    if(err) {
      return res.json(util.successFalse(err));
    } else if(!user || !user.authenticate(req.body.password)) {
      return res.json(util.successFalse(null, 'Username or Password is invalid'));
    } else {
      let payload = {
        _id : user._id,
        name: user.name
      };
      
      let secretOrPrivateKey = res.app.get('jwt-secret');
      let options = { expiresIn: 60*60*24 };
      jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
        if(err) return res.json(util.successFalse(err));
        res.json(util.successTrue(token));
      });
    }
  });
});

router.get('/me', util.isSigned, (req, res, next) => {
  User.findById(req.decoded._id)
  .exec((err, user) => {
    return res.json(err || !user ? util.successFalse(err) : util.successTrue(user));
  });
});

router.get('/refresh', util.isSigned, (req, res, next) => {
  User.findById(req.decoded._id)
  .exec((err, user) => {
    if(err || !user) {
      return res.json(util.successFalse(err));
    } else {
      let payload = {
        _id : user._id,
        name: user.name
      };
      let secretOrPrivateKey = res.app.get('jwt-secret');
      let options = { expiresIn: 60*60*24 };
      jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
        if(err) return res.json(util.successFalse(err));
        res.json(util.successTrue(token));
      });
    }
  });
});

export default router;
