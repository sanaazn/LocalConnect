const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: String, enum: ['alert', 'tip', 'info'] },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [mongoose.Decimal128], required: true },
  },
  timestamp: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
