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

export default connection.model("user", userSchema);