// Seeds file that remove all cats and create 2 new cats

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Cat = require("../models/User"); /** Add a model to use for your seed file here */

mongoose
  .connect('mongodb://localhost/models-example', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let cats = [
  {
    name: "alice",
    color: 'Orange',
  },
  {
    name: "bob",
    color: 'Black',
  }
]

Cat.deleteMany()
.then(() => {
  return Cat.create(cats);
})
.then(catsCreated => {
  console.log(`${catsCreated.length} cats created with the following id:`);
  console.log(catsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect();
})
.catch(err => {
  mongoose.disconnect();
  throw err;
});