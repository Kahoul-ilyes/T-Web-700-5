let mongoose = require('mongoose')
mongoose.connect(`${process.env.mongoUrl}`, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let cryptoSchema = require('../schemas/crypto')

module.exports = db.model('Crypto', cryptoSchema)
