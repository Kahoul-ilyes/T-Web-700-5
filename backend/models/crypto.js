let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')
import { isURL } from 'validator'

let cryptoSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  acronym: String,
  currentPrice: Number,
  openingPrice: Number,
  lowestPrice: Number,
  highestPrice: Number,
  logo: {
    type: String,
    validate: {
      validator: isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  },
  website: {
    type: String,
    validate: {
      validator: isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  }
}, {
  collection: 'cryptos',
  timestamps: true
});

module.exports = cryptoSchema