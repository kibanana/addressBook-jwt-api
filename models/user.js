import mongoose from 'mongoose';
import connection from './connection';

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
  return password == this.password;
};

export default connection.model("user", userSchema);
