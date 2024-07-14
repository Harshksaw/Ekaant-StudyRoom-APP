const mongoose = require('mongoose');

const appSchema= new mongoose.Schema({
  Banner:{
    type: [{ type: String }],
    required: false,

  },
  locations:[{
    type: String,
    required: true,

  }],
  
});

const App = mongoose.model('App', appSchema);

module.exports = App;