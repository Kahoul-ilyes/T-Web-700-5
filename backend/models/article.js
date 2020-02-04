let mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let articleSchema = require('../schemas/article')

module.exports = db.model('Article', articleSchema)
