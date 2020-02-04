let mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let rssSchema = require('../schemas/rss')

module.exports = db.model('Rss', rssSchema)
