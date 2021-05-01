const express = require('express');
const router  = express.Router();
const Cat = require('../../models/Cat');
const catColorEnum = ['Black', 'Orange', 'Bi-Color', 'White', 'Grey'];



/** GET Cat Create  <Create Route> */
router.get('/create', (req, res, next) => {
    Cat.find()
    .then(catsFromDb => { 
      res.render('cat-views/cat-create', {cats: catsFromDb, errorMessage: req.query.errorMessage ? req.query.errorMessage : false});
    }).catch(err => next(err));
});

// 

// 

/** Post Cat Create  <Create Route> */
router.post('/create', (req, res, next) => {
  // console.log({colorInput: `${req.body.color.charAt(0).toUpperCase()}${req.body.color.slice(1)}`});
  const isColorValid = catColorEnum.filter(color => `${req.body.color.charAt(0).toUpperCase()}${req.body.color.slice(1)}` === color).length > 0;

  console.log({body: req.body});

  if(!isColorValid) {
    Cat.find()
    .then(catsFromDb => { 
    // res.redirect('/cats/create?errorMessage=Please Select A Valid Color For Your Feline');

      const cats = catsFromDb.map(cat => {
        cat.catSelected = req.body.siblings.includes(String(cat._id)); 
        return cat;
      });

      res.render('cat-views/cat-create', {...req.body, cats, errorMessage: `Please Select A Valid Color For Your Feline`});
      return;
    }).catch(err => next(err));
  }

  const catData = {
    name: `${req.body.name.charAt(0).toUpperCase()}${req.body.name.slice(1)}`,
    color: `${req.body.color.charAt(0).toUpperCase()}${req.body.color.slice(1)}`,
    siblings: req.body.siblings
  };

  Cat.create(catData)
  .then(newlyCreatedCat => {
    res.redirect(`/cats/details/${newlyCreatedCat._id}`);
  }).catch(err => next(err));
});

// 

// 

/** GET Cat List  <Read Route> */
router.get('/', (req, res, next) => {
  Cat.find()
  .then(catsFromDb => {
    res.render('cat-views/cats', { cats: catsFromDb });
  }).catch(err => next(err));
});

// 

// 

/** Get Cat Details <Read Route> */
router.get('/details/:catId', (req, res, next) => {
  Cat.findById(req.params.catId).populate('siblings')
  .then(catFromDb => {
    // console.log({query: req.query.canEdit, typeOf: typeof req.query.canEdit, canEdit: !!req.query.canEdit});
    Cat.find()
    .then(catsFromDb => {
      const cats = catsFromDb.map(cat=> {
        cat.catSelected = (catFromDb.siblings.filter(sibling => String(sibling._id) === String(cat._id)).length > 0); 
        
          if(String(cat._id) !== String(catFromDb._id)) {
            return cat;
          }
        }).filter(cat => !!cat);
  
      catFromDb.canModify = !!req.query.canEdit;
      res.render('cat-views/cat-details', { cat: catFromDb, cats: !!req.query.canEdit ? cats : false, errorMessage: !!req.query.errorMessage ? req.query.errorMessage : false });
    })
  }).catch(err => next(err));
});

// 

// 

/** We were able to remove the the additional route and save 7 lines of code by passing a query parameter to the details route */
/** Look for the query route link in cat-details.hbs on line 14 */

// /** Get Cat Edit <Read Route> */
// router.get('/edit/:catId', (req, res, next) => {
//   Cat.findById(req.params.catId)
//   .then(catFromDb => {
//     catFromDb.canModify = true;
//     res.render('cat-views/cat-details', { cat: catFromDb });
//   }).catch(err => next(err));
// });

// 

// 

/** Post Cat Update <Update Route> */
router.post('/update/:catId', (req, res, next) => {
  const catData = {
    name: `${req.body.name.charAt(0).toUpperCase()}${req.body.name.slice(1)}`,
    color: `${req.body.color.charAt(0).toUpperCase()}${req.body.color.slice(1)}`,
    siblings: req.body.siblings
  };

  const isColorValid = catColorEnum.filter(color => `${req.body.color.charAt(0).toUpperCase()}${req.body.color.slice(1)}` === color).length > 0;

  if(!isColorValid) {
    res.redirect(`/cats/details/${req.params.catId}?errorMessage=Please Select A Valid Color For Your Feline&canEdit=true`);
      return;
  }

  Cat.findByIdAndUpdate(req.params.catId, catData, {new: true})
  .then(catFromDb => {
    console.log({catFromDb});

    res.redirect(`/cats/details/${catFromDb._id}`);
  }).catch(err => next(err));
});

// 

// 

/** Post Cat Delete <Delete Route> */
router.get('/delete/:catId', (req, res, next) => {
  Cat.findByIdAndDelete(req.params.catId)
  .then(() => {
    res.redirect(`/cats`);
  }).catch(err => next(err));
});


module.exports = router;