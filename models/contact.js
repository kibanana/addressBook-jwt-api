import connection from './connection';

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

const contactSchema = mongoose.Schema({
  num: {
    type: Number, 
    required: true, 
    unique: true
  },
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  phone: {
    type: String
  }
});

contactSchema.plugin(autoIncrement.plugin, {
  model: 'contact', 
  field: 'num', 
  startAt: 1, 
  incrementBy: 1 
});

export default connection.model("contact", contactSchema);
