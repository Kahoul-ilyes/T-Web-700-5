let express = require('express')
let router = express.Router()

let mongoose = require('mongoose')

let User = require('../../models/user')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.send({err: err})
    } else {
      if (users) res.send({ users: users})
      else res.send({ users: []})
    }
  })

})

router.post('/register', (req, res, next) => {

  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let password_confirmation = req.body.password

  if (!username || !email || !password || !password_confirmation) {
    res.json({error: 'Bad request formatting, some params are missing.'})
  }

  User.create({
    username: username,
    email: email,
    password: password
  }, (err, user) => {
    if (err) res.json({err: err})
    else {
      res.json({user: user})
    }
  })
})

router.post('/login', (req, res, next) => {

  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    res.status(400)
    res.send({error: 'Bad request formatting, some params are missing.'})
  }

  res.status(200)
  res.send({res: 'Login done.'})
})



module.exports = router
