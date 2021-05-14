const express = require('express');
const router  = express.Router();
const Home = require('../../models/Home');

/* GET home page */
router.get('/', (req, res, next) => {
  Home.find()
  .then(homesFromDb => {
    const homes = !req.query.searchQuery ? homesFromDb : homesFromDb.map(home => {
      if(home.name.toLowerCase().includes(req.query.searchQuery.toLowerCase())) {
        return home;
      }
    }).filter(home => !!home);
    res.render('home-views/homes', { homes });
  }).catch(err => next(err));
});

module.exports = router;
