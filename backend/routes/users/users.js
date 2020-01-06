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

router.post('/register', (req, res, next) => {

  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let password_confirmation = req.body.password

  if (!username || !email || !password || !password_confirmation) {
    res.json({error: 'Bad request formatting, some body params are missing.'})
  }
  
  if (password != password_confirmation) {
    res.json({error: 'The confirmation does not match the password.'})
  }

  User.create({
    username: username,
    email: email,
    password: password
  }, (err, user) => {
    if (err) throw err
    else {
      res.json({user: user})
    }
  })

  res.end()
})

router.post('/login', (req, res, next) => {

  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    res.json({error: 'Bad request formatting, some body params are missing.'})
  } else {
    User.findOne({email: email}, (err, user) => {
      if (err) throw err
      if (user) {
        user.checkPassword(password, (err, isMatch) => {
          if (err) throw err
          
          if (isMatch) {
            res.json({user: user, msg: 'Login successful'})
          } else {
            res.json({err: 'The password doesn\'t match.'})
          }
        })
      } else {
        res.json({err: 'No user found with this email address.'})
      }
    })
  }
})

module.exports = router
