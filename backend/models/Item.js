const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  collection: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  frontImage: {
    type: String,
    required: true
  },
  backImage: {
    type: String,
    required: true
  },
  colors: [{
    type: String
  }],
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema); 