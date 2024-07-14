const mongoose = require('mongoose');

const appSchema= new mongoose.Schema({
  Banner:{
    type: String,
    required: true,

  },
  locations:[{
    type: String,
    required: true,

  }],
  
});

const App = mongoose.model('App', appSchema);

module.exports = App;