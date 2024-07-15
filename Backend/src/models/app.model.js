const mongoose = require('mongoose');

const appSchema= new mongoose.Schema({
  Banner:{
    type: [{ type: String }],
    required: false, //home banner caousel ,3

  },
  locations:[{
    type: String,
    required: true,
    // location ,header picker 
  }],
  
});

const App = mongoose.model('App', appSchema);

module.exports = App;