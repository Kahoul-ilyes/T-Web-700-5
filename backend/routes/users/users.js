let express = require('express')
let router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/register', (req, res, next) => {

  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let password_confirmation = req.body.password

  if (!username || !email || !password || !password_confirmation) {
    res.status(400)
    res.send({error: 'Bad request formatting, some params are missing.'})
  }

  res.status(200)
  res.send({res: 'Register done.'})
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
