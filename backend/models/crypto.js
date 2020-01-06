let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let cryptoSchema = require('../schemas/crypto')

module.exports = db.model('Crypto', cryptoSchema)