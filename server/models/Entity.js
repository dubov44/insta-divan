const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Entity', entitySchema); 