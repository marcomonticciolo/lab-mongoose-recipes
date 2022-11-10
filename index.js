const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
   return Recipe.create({
    title: "Cookies",
    level: "Amateur Chef",
    ingredients: ["butter","flour","brown sugar","vanilla","baking powder","eggs","chocolate chips"],
    cuisine: "american",
    dishtype: "dessert",
    duration: 30,
    creator: "marco",
   })
  }).then(() => {
    return Recipe.insertMany(data)
  }).then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"},{ duration: 100})
  }).then (() => {
    return Recipe.deleteOne({ title: "Carrot Cake"})
  }).then(() => {
      return mongoose.connection.close()
  }).then(() => console.log('connection closed'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
