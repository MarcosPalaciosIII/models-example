const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  color: {
    type: String,
    enum: ['Black', 'Orange', 'Bi-Color', 'White', 'Grey']
  },
  siblings: {type: [{type: Schema.Types.ObjectId, ref: 'Cat'}]}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;
