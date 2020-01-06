let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
let userSchema = require('../schemas/user')

module.exports = db.model('User', userSchema)