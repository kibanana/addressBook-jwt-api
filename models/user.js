import mongoose from 'mongoose';
import connection from './connection';
import config from '../config';
import * as crypto from 'crypto';
// 넣을 때랑, 비교할때만 신경쓰면 됨

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  phone: {
    type: String,
    trim:true
  }
});

userSchema.methods.authentificate = function (password) {
  const encrypted = crypto.createHmac('sha256', config.jwtSecret)
  .update(password)
  .digest('base64');
  console.log(encrypted);
  return encrypted == this.password;
};

export default connection.model("user", userSchema);
