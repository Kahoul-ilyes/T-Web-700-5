let express = require('express')
let router = express.Router()

let User = require('../../models/user')

/**
 * @apiDefine NoUserError
 * @apiError UserNotFound Please provide an id param.
 */

/**
 * @api {get} /users/ Request all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "users": [
 *         {
 *           "_id": "567897656zqdjqld",
 *           "username": "Toto",
 *           "email": "toto@yopmail.com",
 *           "currency": "EUR",
 *           "cryptos": [],
 *           "keywords": []
 *         },
 *         {
 *           "_id": "KA¨LDOASKA!çéà'",
 *           "username": "Alice",
 *           "email": "alice@yopmail.com",
 *           "currency": "USD",
 *           "cryptos": [],
 *           "keywords": []
 *         }
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) throw err

    if (users) res.send({ users: users})
    else res.send({ users: []})
  })
})

/**
 * @api {get} /users/:id Request an user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {ObjectId} id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "JzmHAD68çzqdld9",
 *         "username": "Toto",
 *         "email": "toto@yopmail.com",
 *         "currency": "EUR",
 *         "cryptos": [],
 *         "keywords": []
 *       }
 *     }
 * @apiUse NoUserError
 */
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

/**
 * @api {post} /users/ Create a new user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "username": "Newuser",
 *       "email": "newuser@yopmail.com",
 *       "password": "myawesomepassword",
 *       "cryptos": [],
 *       "currency": "AUS",
 *       "keywords": ["bictoin", "lightning"]
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "47ADLKeqdmzah7A9E",
 *         "username": "Newuser",
 *         "email": "newuser@yopmail.com",
 *         "currency": "AUS",
 *         "cryptos": [],
 *         "keywords": ["bictoin", "lightning"]
 *       },
 *       "msg": "User created successfully."
 *     }
 */
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
    res.json({error: 'Bad request formatting, username, email or password is missing.'})
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
      res.json({user: user, msg: 'User created successfully.'})
    }
  })

})

/**
 * @api {put} /users/:id Update an existing user
 * @apiName PutUser
 * @apiGroup User
 * 
 * @apiParam {ObjectId} id User's unique ID.
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "email": "tata@yopmail.com",
 *       "currency": "AUS",
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "567897656zqdjqld",
 *         "username": "Toto",
 *         "email": "tata@yopmail.com",
 *         "currency": "AUS",
 *         "cryptos": [],
 *         "keywords": []
 *       },
 *       "msg": "User updated successfully."
 *     }
 * @apiUse NoUserError
 */
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
      res.json({user: user, msg: 'User updated successfully.'})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

/**
 * @api {delete} /users/:id Remove an user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {ObjectId} id User's unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "567897656zqdjqld",
 *       "msg": "User deleted successfully."
 *     }
 * @apiUse NoUserError
 */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  User.findOneAndDelete(req.params.id, (err, user) => {
    if (err) throw err

    if (user) {
      res.json({_id: req.params.id, msg: 'User deleted successfully.'})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

/**
 * @api {get} /users/:id/cryptos Request an user's cryptos
 * @apiName GetUserCryptos
 * @apiGroup User
 *
 * @apiParam {ObjectId} id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cryptos": []
 *     }
 * @apiUse NoUserError
 */
router.get('/:id/cryptos', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  User.findById(req.params.id, 'cryptos', (err, doc) => {
    if (err) throw err
    console.log(doc)

    if (doc) {
      res.json({cryptos: doc.cryptos})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

/**
 * @api {get} /users/:id/keywords Request an user's keywords
 * @apiName GetUserKeywords
 * @apiGroup User
 *
 * @apiParam {ObjectId} id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "keywords": []
 *     }
 * @apiUse NoUserError
 */
router.get('/:id/keywords', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  User.findById(req.params.id, 'keywords', (err, doc) => {
    if (err) throw err
    console.log(doc)

    if (doc) {
      res.json({keywords: doc.keywords})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })
})

module.exports = router
