let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')

let articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: String,
  source: String,
  date: Date,
  url: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  },
  image: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  }
}, {
  collection: 'articles' ,
  timestamps: true
});

module.exports = articleSchema