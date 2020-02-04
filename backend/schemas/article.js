let mongoose = require('mongoose')
let Schema = mongoose.Schema

let validator = require('validator')

let articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  pubDate : Date,
  comments : String,
  content: String,
  "content:encoded": String,
  source: String,
  date: Date,
  link: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: 'Please fill a valid URL',
      isAsync: false
    }
  },
  enclosure:
   {
     url: {type: String},
     length: {type: String},
     type: {type: String} },
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
  categories: Array,
  timestamps: true
});

articleSchema.index({title: 'text', content: 'text', "content:encoded": 'text'})

module.exports = articleSchema