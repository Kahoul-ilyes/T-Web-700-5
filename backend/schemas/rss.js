let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')

let rssSchema = new Schema({
  isFetchable: {
    type: Boolean,
    default: true
  },
  url: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  },
}, {
  collection: 'rss',
  timestamps: true
});

module.exports = rssSchema