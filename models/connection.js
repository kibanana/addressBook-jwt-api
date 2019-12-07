import mongoose from 'mongoose';

export default connection = mongoose.createConnection(config.mongodbUri, {useUnifiedTopology : true, useNewUrlParser : true,}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});
