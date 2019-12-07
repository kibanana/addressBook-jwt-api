import mongoose from 'mongoose';
import config from '../config';

const connection = mongoose.createConnection(config.mongodbUri, {useUnifiedTopology : true, useNewUrlParser : true,}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

export default connection;