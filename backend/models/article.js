let mongoose = require('mongoose')
mongoose.connect(`${process.env.mongoUrl}`, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let articleSchema = require('../schemas/article')

module.exports = db.model('Article', articleSchema)
