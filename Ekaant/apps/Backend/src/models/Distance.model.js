const mongoose = require('mongoose');

const distanceSchema = new mongoose.Schema({
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true },
  city: { type: String, required: true },
  distance: { type: Number, required: true }
});

module.exports = mongoose.model('Distance', distanceSchema);