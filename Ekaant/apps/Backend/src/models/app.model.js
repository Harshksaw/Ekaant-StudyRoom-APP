const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  Banner: {
    type: [{ type: String }],
    required: false, //home banner caousel ,3

  },
  locations: [{
    location: {
      type: String,
      required: true
    },
    locationImage: {
      type: String,
      required: false,
    },
    coords: {
      type: [Number],
      required: false,

    }
  }]
  ,
  RegistrationFee :{
    type: Number,
    required: false,

  }
})

const App = mongoose.model('App', appSchema);

module.exports = App;