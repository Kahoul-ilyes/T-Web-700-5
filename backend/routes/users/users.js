let express = require('express')
let router = express.Router()

let axios = require('axios')

const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEVTVSVU5CUWpnM01FSkZSVEpFTURRMU9VWTNOVUk1UVVJd09UUXhSa1pHTkVZeU9UUTJOUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tNmZyeHA5dS5ldS5hdXRoMC5jb20vIiwic3ViIjoiNDd5TkRDVXhaTUkybEJOR0g2djBnVmJHZHZUVGROUnVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LW02ZnJ4cDl1LmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgwNzQyMzgyLCJleHAiOjE1ODA4Mjg3ODIsImF6cCI6IjQ3eU5EQ1V4Wk1JMmxCTkdINnYwZ1ZiR2R2VFRkTlJ1Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.eqBePYeg-XVxT3SfMrWhSaEA22qKrYqQMVVYq0_Rc715_AT0qSVnI0JfN1E880wHYny6dm0IxHbp44NnoLXPTOAHsRL8G7upoa0yaaE7cbUalpWJHsbK8rOp9x9Zz1IpFhmZVXAnLE2sbGyv0SMe68NNbIpAzlc5HWWddeBQfWsmqoNHj9TL0TwzoojU6K6aF071TpL7a5hPku6TVBSoeZCIivwFhPXvxkXLgsIc7g5M9E_0CY9MJNvb-eTLJ6MSdqH4R1Q44GP-wR3smh6BPR8j-EYpzAonrSd89vz_uvQeYY4rf6HPc9CsRGinXKXe3nHET0Vqmxa75YmC1iaP8Q'

axios.defaults.baseURL = 'https://dev-m6frxp9u.eu.auth0.com/api/v2/'
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`



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
  axios
  .get('users')
  .then(response => {
    res.json({users: response.data})
  }).catch(err => {
    res.json(handleError(err))
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

  axios
  .get(`users/${req.params.id}`)
  .then(response => {
    let user = response.data
    // get user roles
    axios
    .get(`users/${req.params.id}/roles`)
    .then(response => {
      res.json({user: user, roles: response.data})
    }).catch(err => {
      res.json(handleError(err))
    })
  }).catch(err => {
    res.json(handleError(err))
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
    // now initialize the user's role
    axios
    .post(`users/${user.user_id}/roles`, { roles: ['rol_659MJW4SYZOZZK7c'] })
    .then(response => {
      res.json({user: user, msg: 'User initialized successfully.'})
    }).catch(err => {
      res.json(handleError(err))
    })
  }).catch(err => {
    res.json(handleError(err))
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
    res.json({user: response.data, msg: 'User created successfully.'})
  }).catch(err => {
    res.json(handleError(err))
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

  console.log('DATAS :', datas)
  
  axios
  .patch(`users/${req.params.id}`, datas)
  .then(response => {
    res.json({user: response.data, msg: 'User updated successfully.'})
  }).catch(err => {
    res.json(handleError(err))
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
  console.log('coucou')
  axios
  .delete(`users/${req.params.id}`)
  .then(response => {
    res.json({_id: req.params.id, msg: 'User deleted successfully.'})
  }).catch(err => {
    res.json(handleError(err))
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

  axios
  .get(`users/${req.params.id}`, params={include_fields: true, fields: user_metadata})
  .then(response => {
    res.json({cryptos: response.data.user_metadata.cryptos})
  }).catch(err => {
    res.json(handleError(err))
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

  axios
  .get(`users/${req.params.id}`, params={include_fields: true, fields: 'user_metadata'})
  .then(response => {
    res.json({keywords: response.data.user_metadata.keywords})
  }).catch(err => {
    res.json(handleError(err))
  })
})

module.exports = router
