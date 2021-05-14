const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const addressObject = require('./random');

const homeSchema = new Schema({
  ownerName: String,
  cats: {type: [{type: Schema.Types.ObjectId, ref: 'Cat'}]},
  address: addressObject
}, {
  timestamps: true
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;
