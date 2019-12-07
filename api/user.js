import express from 'express';
import User from '../models/user';
import Contact from '../models/contact';
import * as util from '../util';

const router = express.Router();

// jwt가 mongodb에 있는지 확인
const checkP = (req, res, next) => {
  User.findOne({name: req.params.name}, (err, user) => {
    if(err || !user) {
      return res.json(util.successFalse(err));
    } else if(!req.decoded || user._id != req.decoded._id) {
      return res.json(util.successFalse(null,'You don\'t have the permission'));
    } else {
      next();
    }
  });
};

router.get('/', util.isSigned, (req, res, next) => {
  User.find({})
  .sort({name: 1})
  .exec(function (err, users) {
    res.json(err || !users ? util.successFalse(err) : util.successTrue(users));
  });
});

router.post('/', (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save(function (err, user) {
    res.json(err || !user ? util.successFalse(err) : util.successTrue(user));
  });
});

router.get('/:name', util.isSigned, (req, res, next) => {
  User.findOne({name: req.params.name}, function (err, user) {
    res.json(err || !user ? util.successFalse(err) : util.successTrue(user));
  });
});

router.patch('/:name', util.isSigned, checkP, (req, res, next) => {
  User.findOneAndUpdate({name: req.params.name}, {$set: req.body}, {new: true}, function(err, user) {
    res.json(err || !user ? util.successFalse(err) : util.successTrue(user));
  });
});

router.delete('/:name', util.isSigned, checkP, (req, res, next) => {
  User.findByIdAndDelete({name: req.params.name}, function (err, user) {
    res.json(err || !user ? util.successFalse(err) : util.successTrue(user));
  });
});


router.get("/contacts", util.isSigned, (req, res) => {
  Contact.find({}, function(err, contacts) {
    res.json(err || !contacts ? util.successFalse(err) : util.successTrue(contacts));
  });
});

router.post("/contacts", util.isSigned, function(req, res) {
  Contact.create(req.body, function(err, contact){
    res.json(err || !contact ? util.successFalse(err) : util.successTrue(contact));
  });
});

router.get("/contacts/:id", util.isSigned, function(req, res){
  Contact.findOne({_id: req.params.id}, function(err, contact){
    res.json(err || !contact ? util.successFalse(err) : util.successTrue(contact));
  });
});

router.get("/contacts/:id/edit", util.isSigned, function(req, res){
  Contact.findOne({_id: req.params.id}, function(err, contact){
    res.json(err || !contact ? util.successFalse(err) : util.successTrue(contact));
  });
});

router.patch("/contacts/:id", util.isSigned, function(req, res){
  Contact.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function(err, contact){
    res.json(err || !contact ? util.successFalse(err) : util.successTrue(contact));
  });
});

router.delete("/contacts/:id", util.isSigned, function(req, res){
  Contact.deleteOne({_id: req.params.id}, function(err, contact){
    res.json(err || !contact ? util.successFalse(err) : util.successTrue(contact));
  });
});

export default router;
