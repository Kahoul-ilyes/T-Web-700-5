let express = require('express')
let router = express.Router()

let User = require('../../models/user')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) throw err

    if (users) res.send({ users: users})
    else res.send({ users: []})
  })
})

/* GET Find a user by is ID */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  User.findById(req.params.id, '-password', (err, user) => {
    if (err) throw err

    if (user) {
      res.json({user: user})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

/* POST Create a new user */
router.post('/', (req, res, next) => {

  // mandatory
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  // optionnal
  let currency = req.body.currency
  let cryptos = req.body.cryptos
  let keywords = req.body.keywords

  if (!username || !email || !password) {
    res.json({error: 'Bad request formatting, some body params are missing.'})
  }

  let datas = {}

  if (username) datas.username = username
  if (email) datas.email = email
  if (password) datas.password = password
  if (currency) datas.currency = currency
  if (cryptos) datas.cryptos = cryptos
  if (keywords) datas.keywords = keywords

  User.create(datas, (err, user) => {
    if (err) throw err
    else {
      res.json({user: user})
    }
  })

})

/* PUT Update a user */
router.put('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  // mandatory
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  // optionnal
  let currency = req.body.currency
  let cryptos = req.body.cryptos
  let keywords = req.body.keywords

  let datas = {}

  if (username) datas.username = username
  if (email) datas.email = email
  if (password) datas.password = password
  if (currency) datas.currency = currency
  if (cryptos) datas.cryptos = cryptos
  if (keywords) datas.keywords = keywords

  User.findOneAndUpdate(req.params.id, datas, (err, user) => {
    if (err) throw err

    if (user) {
      res.json({user: user, msg: 'User updated succesfully.'})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

/* DELETE Remove a user */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  User.findOneAndDelete(req.params.id, (err, user) => {
    if (err) throw err

    if (user) {
      res.json({userId: req.params.id, msg: 'User deleted succesfully.'})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

module.exports = router
