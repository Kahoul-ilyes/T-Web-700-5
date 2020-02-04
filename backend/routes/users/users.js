let async = require('async/waterfall')

let express = require('express')
let router = express.Router()



let axios = require('axios')

axios.defaults.baseURL = `${process.env.audienceAuth0}`


function handleError(err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {err: err.response.data}
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {err: err.request}
  } else {
    // Something happened in setting up the request that triggered an Error
    return {err: err.message}
  }
}

function logHandleError(err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(err.response.data)
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(err.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(err.message)
  }
}

// get access token
const getAccessToken = (callback) => {
  console.log('retrieving accesstoken')
  const accessTokenDatas = {
    "client_id":`${process.env.CLIENT_ID}`,
    "client_secret": `${process.env.CLIENT_SECRET}`,
    "audience": `${process.env.audienceAuth0}`,
    "grant_type": "client_credentials"
  }
  axios
  .post('https://dev-m6frxp9u.eu.auth0.com/oauth/token', accessTokenDatas)
  .then(response => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
    callback(null)
  }).catch(err=> {
    logHandleError(err)
    callback(null)
  })
}

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
 *         user1,
 *         user2
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {
  async([
    getAccessToken,
    function(callback) {
      axios
      .get('users')
      .then(response => {
        callback(null, {users: response.data})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
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
 * {
 *   "user": {
 *       "created_at": "2020-01-28T12:40:23.511Z",
 *       "email": "toto@yopmail.com",
 *       "email_verified": false,
 *       "identities": [
 *           {
 *               "user_id": "5e302bb72d8bd60e7a2b2f19",
 *               "provider": "auth0",
 *               "connection": "Username-Password-Authentication",
 *               "isSocial": false
 *           }
 *       ],
 *       "user_metadata": {
 *           "currency": "USD",
 *           "cryptos": [],
 *           "keywords": [
 *               "Bitcoin",
 *               "dollar",
 *               "Cointelegraph"
 *           ]
 *       },
 *       "name": "toto@yopmail.com",
 *       "nickname": "toto",
 *       "picture": "https://s.gravatar.com/avatar/5e97dde8285093128059298e52eeeb55?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fto.png",
 *       "updated_at": "2020-01-28T12:40:23.985Z",
 *       "user_id": "auth0|5e302bb72d8bd60e7a2b2f19",
 *       "username": "toto",
 *       "last_ip": "163.5.170.74",
 *       "last_login": "2020-01-28T12:40:23.985Z",
 *       "logins_count": 1
 *   },
 *   "roles": [
 *     {
 *       "id": "AIqsjqeiodfjop356789",
 *       "name": "basic",
 *       "description": "trololol role basic utilisateur"
 *     }
 *   ]
 * }
 * @apiUse NoUserError
 */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  async([
    getAccessToken,
    function(callback) {
      axios
      .get(`users/${req.params.id}`)
      .then(response => {
        let user = response.data
        callback(null, user)
      }).catch(err => {
        callback(err)
      })
    },
    function(user, callback) {
      // get user roles
      axios
      .get(`users/${user.user_id}/roles`)
      .then(response => {
        callback(null, {user: user, roles: response.data})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
  })
  
})

/**
 * @api {post} /users/:id/initialize Initialize a new user
 * @apiName InitializeUser
 * @apiGroup User
 * 
 * @apiParam {ObjectId} id User's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *       },
 *       "msg": "User initialized successfully."
 *     }
 */
router.post('/:id/initialize', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  async([
    getAccessToken,
    function(callback) {
      let datas = {
        user_metadata: {
          currency: "EUR",
          cryptos: [],
          keywords: []
        }
      }
    
      axios
      .patch(`users/${req.params.id}`, datas)
      .then(response => {
        // the user metadata are succesffuly initialize
        let user = response.data
        callback(null, user)
      }).catch(err => {
        callback(err)
      })
    },
    function(user, callback) {
      // now initialize the user's role
      axios
      .post(`users/${user.user_id}/roles`, { roles: ['rol_659MJW4SYZOZZK7c'] })
      .then(response => {
        callback(null, {user: user, roles: ['basic'], msg: 'User initialized successfully.'})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
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

  async([
    getAccessToken,
    function(callback) {
      
      let datas = {
        connection: "Username-Password-Authentication",
        user_metadata: {
          currency: "EUR",
          cryptos: [],
          keywords: []
        },
        verify_email: true
      }

      if (username) datas.username = username
      if (email) datas.email = email
      if (password) datas.password = password
      if (currency) datas.user_metadata.currency = currency
      if (cryptos) datas.user_metadata.cryptos = cryptos
      if (keywords) datas.user_metadata.keywords = keywords

      axios
      .post('users', datas)
      .then(response => {
        callback(null, {user: response.data, msg: 'User created successfully.'})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
  })
})

/**
 * @api {patch} /users/:id Update an existing user
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
router.patch('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  async([
    getAccessToken,
    function(callback) {
      // mandatory
      let username = req.body.username
      let email = req.body.email
      let password = req.body.password
      // optionnal
      let currency = req.body.currency
      let cryptos = req.body.cryptos
      let keywords = req.body.keywords

      let datas = {
        user_metadata: {}
      }

      if (username) datas.username = username
      if (email) datas.email = email
      if (password) datas.password = password
      if (currency) datas.user_metadata.currency = currency
      if (cryptos) datas.user_metadata.cryptos = cryptos
      if (keywords) datas.user_metadata.keywords = keywords

      axios
      .patch(`users/${req.params.id}`, datas)
      .then(response => {
        callback(null, {user: response.data, msg: 'User updated successfully.'})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
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
 *       "_id": "auth0|567897656zqdjqld",
 *       "msg": "User deleted successfully."
 *     }
 * @apiUse NoUserError
 */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  async([
    getAccessToken,
    function(callback) {
      axios
      .delete(`users/${req.params.id}`)
      .then(response => {
        callback(null, {_id: req.params.id, msg: 'User deleted successfully.'})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
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

  async([
    getAccessToken,
    function(callback) {
      axios
      .get(`users/${req.params.id}`, params={include_fields: true, fields: 'user_metadata'})
      .then(response => {
        callback(null, {cryptos: response.data.user_metadata.cryptos})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
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

  async([
    getAccessToken,
    function(callback) {
      axios
      .get(`users/${req.params.id}`, params={include_fields: true, fields: 'user_metadata'})
      .then(response => {
        callback(null, {keywords: response.data.user_metadata.keywords})
      }).catch(err => {
        callback(err)
      })
    }
  ], function(err, result) {
    if (err) res.json(handleError(err))
    else res.json(result)
  })
})

module.exports = router
