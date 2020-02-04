let mongoose = require('mongoose')
// connect to Mongo daemon
mongoose
    .connect(
        `${process.env.MONGO_URL}`,
        {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let db = mongoose.connection
let cryptoSchema = require('../schemas/crypto')

module.exports = db.model('Crypto', cryptoSchema)
