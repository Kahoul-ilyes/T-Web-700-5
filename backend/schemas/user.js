const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

const validator = require('validator')

const cryptoSchema = require('./crypto')
const Crypto = db.model('Crypto', cryptoSchema)


const userSchema = new Schema({
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
      validator: validator.isEmail,
      message: 'Please fill a valid email address',
      isAsync: false
    }
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  currency: {
    type: String,
    default: 'EUR'
  },
  cryptos: [{ type: Schema.Types.ObjectId, ref: 'Crypto'}],
  keywords: {
    type: [
      {
        word: String
      }
    ]
  }
}, {
  collection: 'users',
  timestamps: true
})

module.exports = userSchema