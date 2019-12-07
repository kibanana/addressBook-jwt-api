import express from 'express';
import Contact from '../models/contact';

const router = express.Router();

router.get("/", function(req, res) {
  res.redirect("/contacts");
});

router.get("/contacts", function(req, res) {
  Contact.find({}, function(err, contacts) {
    console.log(contacts);
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'index.ejs'), {contacts:contacts});
  });
});

router.get("/contacts/new", function(req, res) {
  res.render(path.join(__dirname, 'views', 'new.ejs'));
});

router.post("/contacts", function(req, res) {
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

router.get("/contacts/:id", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'show.ejs'), {contact:contact});  });
});

router.get("/contacts/:id/edit", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'edit.ejs'), {contact:contact});  
  });
});

router.put("/contacts/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);    
    res.redirect("/contacts/"+req.params.id);  
  });
});

router.delete("/contacts/:id", function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);    
    res.redirect("/contacts"); 
  });
});

export default router;
