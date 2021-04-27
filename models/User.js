const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  color: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;
