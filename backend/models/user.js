let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')
import { isEmail } from 'validator'

let cryptoSchema = require('./crypto')

let userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: {
      validator: isEmail,
      message: 'Please fill a valid email address',
      isAsync: false
    }
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  currency: String,
  cryptos: {
    type: [cryptoSchema]
  },
  keywords: {
    type: [
      {
        word: String
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  collection: 'users',
  timestamps: true
});

module.exports = userSchema