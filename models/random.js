// Models

const models = {
  1: "catModel",
  2: 'homeModel'
};

module.exports = addressObject = {
  houseNumber: { type: String },
  aptNumber: { type: String },
  streetName: { type: String },
  city: { type: String },
  state: { type : String },
  zip: { type: Number }
};

// Model Ideas

/**
 * Adoption Agency - healthServices(listOfHealthServices) - vet(vetServices) - products(cats)
 * Cat Sitter - fees(time)
 * Pet Store - groomingServices - healthServices(listOfHealthServices) - products(foodsAndToys) - vet(vetServices)
 * Vet - healthServices(listOfHealthServices)
 * Home - occupants(user)
 * Groomer - groomingService - fees(time)
 * 
 * These all have a list of cats
 * 
 */


// Address - ( All models have this in common except for the cat model )
/**
 * HouseNumber
 * AptNumber
 * StreetName
 * City
 * State
 * Zip
 */