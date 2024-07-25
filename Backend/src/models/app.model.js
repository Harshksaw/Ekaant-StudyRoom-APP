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
    coords: {
      type: [Number],
      required: true,

    }
  }]
})

const App = mongoose.model('App', appSchema);

module.exports = App;