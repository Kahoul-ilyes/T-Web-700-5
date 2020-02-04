let mongoose = require('mongoose')
mongoose
    .connect(
        `${process.env.MONGO_URL}`,
        {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let db = mongoose.connection
let rssSchema = require('../schemas/rss')

module.exports = db.model('Rss', rssSchema)
