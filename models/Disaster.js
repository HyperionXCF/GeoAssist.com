const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema({
  disasterName: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index for geospatial queries
disasterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Disaster', disasterSchema);