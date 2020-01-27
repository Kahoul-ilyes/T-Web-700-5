let express = require('express')
let router = express.Router()

let User = require('../../models/user')

/**
 * @apiDefine BadRequest
 * @apiError BadRequestFormatting Bad request formatting, some body params are missing.
 */

/**
 * @api {post} /register Register a new user
 * @apiName PostRegister
 * @apiGroup Authentification
 * 
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "username": "Toto",
 *       "email": "toto@yopmail.com",
 *       "password": "myawesomepassword",
 *       "password_confirmation": "myawesomepassword"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "567897656zqdjqld",
 *         "username": "Toto",
 *         "email": "toto@yopmail.com",
 *         "currency": "EUR",
 *         "cryptos": [],
 *         "keywords": []
 *       },
 *       "msg": "User registered successfully."
 *     }
 * @apiUse BadRequest
 */
router.post('/register', (req, res, next) => {

  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let password_confirmation = req.body.password_confirmation

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
      res.json({user: user, msg: 'User registered successfully.'})
    }
  })
})

/**
 * @api {post} /login Login an user
 * @apiName PostLogin
 * @apiGroup Authentification
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "email": "toto@yopmail.com",
 *       "password": "myawesomepassword"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "567897656zqdjqld",
 *         "username": "Toto",
 *         "email": "toto@yopmail.com",
 *         "currency": "EUR",
 *         "cryptos": [],
 *         "keywords": []
 *       },
 *       "Login successful."
 *     }
 * @apiUse BadRequest
 */
router.post('/login', (req, res, next) => {

  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    res.json({error: 'Bad request formatting, some body params are missing.'})
  } else {
    User.findOne({email: email}, '-password', (err, user) => {
      if (err) throw err
      if (user) {
        user.checkPassword(password, (err, isMatch) => {
          if (err) throw err
          
          if (isMatch) {
            res.json({user: user, msg: 'Login successful.'})
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