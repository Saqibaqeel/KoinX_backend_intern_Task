const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  marketCap: {
    type: Number,
    required: true,
    min: 0
  },
  change24h: {
    type: Number,
    required: true
  },
  img:{
    type:String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});



const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
