const express = require('express');
const router  = express.Router();
const Home = require('../../models/Home');
const Cat = require('../../models/Cat');

/** GET Home Create  <Create Route> */
router.get('/create', (req, res, next) => {
      res.render('home-views/home-create', {errorMessage: req.query.errorMessage ? req.query.errorMessage : false});
});

// 

// 

/** Post Home Create  <Create Route> */
router.post('/create', (req, res, next) => {
  console.log({body: req.body});

  // if(!isColorValid || !req.body.name) {
  //   Cat.find()
  //   .then(catsFromDb => { 
  //   // res.redirect('/cats/create?errorMessage=Please Select A Valid Color For Your Feline');

  //     const cats = catsFromDb.map(cat => {
  //       cat.catSelected = req.body.siblings.includes(String(cat._id)); 
  //       return cat;
  //     });

  //     res.render('cat-views/cat-create', {...req.body, cats, errorMessage: `Please Select A Valid Color For Your Feline`});
  //     return;
  //   }).catch(err => next(err));
  // }

  const ownersName = req.body.ownerName.split(' ').map(name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`).join(' ');
  console.log({ownersName});

  const homeData = {
    ownerName: ownersName,
    address: {
              houseNumber: req.body.houseNumber,
              aptNumber: req.body.aptNumber,
              streetName: req.body.streetName,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip
            }
  };

  console.log({homeData});

  Home.create(homeData)
  .then(newlyCreatedHome => {
    console.log({newlyCreatedHome});
    res.redirect(`/homes/details/${newlyCreatedHome._id}`);
  }).catch(err => next(err));
});

// 

// 

/** GET Home List  <Read Route> */
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

// 

// 

/** Get Home Details <Read Route> */
router.get('/details/:homeId', (req, res, next) => {
  Home.findById(req.params.homeId).populate('cats')
  .then(homeFromDb => {
    Cat.find()
    .then(catsFromDb => {
      const cats = catsFromDb.map(cat=> {
        cat.catSelected = (homeFromDb.cats.filter(homeCat => String(homeCat._id) === String(cat._id)).length > 0); 
        
          if(!cat.catSelected && !req.query.canEdit) {
            return cat;
          } else {
            return cat;
          }
        }).filter(cat => !!cat);

      homeFromDb.canModify = !!req.query.canEdit;
      console.log({homeFromDb});
      res.render('home-views/home-details', { home: homeFromDb, cats: !!req.query.canEdit ? cats : false, errorMessage: !!req.query.errorMessage ? req.query.errorMessage : false });
    });
  }).catch(err => next(err));
});

// 

// 

/** Post Home Update <Update Route> */
router.post('/update/:homeId', (req, res, next) => {
  const ownersName = req.body.ownerName.split(' ').map(name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`).join(' ');
  console.log({ownersName});

  const homeData = {
    ownerName: ownersName,
    address: {
              houseNumber: req.body.houseNumber,
              aptNumber: req.body.aptNumber,
              streetName: req.body.streetName,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip
            }
  };

  Home.findByIdAndUpdate(req.params.homeId, homeData, { new: true })
  .then(homeFromDb => {
    console.log({homeFromDb});

    res.redirect(`/homes/details/${homeFromDb._id}`);
  }).catch(err => next(err));
});

// 

/** Get Remove Cat From Home Update <Update Route> */
router.get('/addRemove/:catId/:homeId', (req, res, next) => {
  Home.findById(req.params.homeId)
  .then(homeFromDb => {
    homeFromDb.cats.includes(String(req.params.catId)) ? homeFromDb.cats.pull(req.params.catId) : homeFromDb.cats.push(req.params.catId);
    homeFromDb.save()
    .then(updatedHomeFromDb => {
      res.redirect(`/homes/details/${updatedHomeFromDb._id}?canEdit=anotherBlah`);
    }).catch(err => next(err));
  }).catch(err => next(err));
})

// 

/** Post Home Delete <Delete Route> */
router.get('/delete/:homeId', (req, res, next) => {
  Home.findByIdAndDelete(req.params.homeId)
  .then(() => {
    res.redirect(`/homes`);
  }).catch(err => next(err));
});

module.exports = router;
