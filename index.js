const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const ejs = require('ejs');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let connection = mongoose.createConnection(process.env.MONGODB, {useUnifiedTopology : true, useNewUrlParser : true,}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

const contactSchema = mongoose.Schema({
  num: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String}
});

contactSchema.plugin(autoIncrement.plugin, {
  model: 'contact', 
  field: 'num', 
  startAt: 1, 
  incrementBy: 1 
});

const Contact = connection.model("contact", contactSchema);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.redirect("/contacts");
});

app.get("/contacts", function(req, res) {
  Contact.find({}, function(err, contacts) {
    console.log(contacts);
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'index.ejs'), {contacts:contacts});
  })
});

app.get("/contacts/new", function(req, res) {
  res.render(path.join(__dirname, 'views', 'new.ejs'));
});

app.post("/contacts", function(req, res) {
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

app.get("/contacts/:id", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'show.ejs'), {contact:contact});  });
});

app.get("/contacts/:id/edit", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render(path.join(__dirname, 'views', 'edit.ejs'), {contact:contact});  
  });
});

app.put("/contacts/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);    
    res.redirect("/contacts/"+req.params.id);  
  });
});

app.delete("/contacts/:id", function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);    
    res.redirect("/contacts"); 
  });
});

let port = 3000;
app.listen(port, function(){
  console.log("Server Starting on "+port+"!");
});