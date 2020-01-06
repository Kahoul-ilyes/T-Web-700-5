let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')
import { isURL } from 'validator'

let articleSchema = new Schema({
  title: String,
  summary: String,
  source: String,
  date: Date,
  url: {
    type: String,
    validate: {
      validator: isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  },
  image: {
    type: String,
    validate: {
      validator: isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  }
}, {
  collection: 'articles' ,
  timestamps: true
});

module.exports = articleSchema