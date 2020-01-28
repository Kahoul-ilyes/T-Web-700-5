const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Bdd connection error:'))
db.once('open', () => {
  console.log('Bdd connected !')
  // we're connected!
});

let indexRouter = require('./routes/index')
let authRouter = require('./routes/auth/auth')
let usersRouter = require('./routes/users/users')
let cryptosRouter = require('./routes/cryptos/cryptos', )
let coinsRouter = require('./routes/cryptos/coins')
let articlesRouter = require('./routes/articles/articles')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'doc')))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-m6frxp9u.eu.auth0.com",
  audience: "https://dev-m6frxp9u.eu.auth0.com/api/v2/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-m6frxp9u.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/v0/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

app.use('/', checkJwt, indexRouter)
app.use('/api/v0/auth', checkJwt, authRouter)
app.use('/api/v0/users', checkJwt, usersRouter)
app.use('/api/v0/cryptos', checkJwt, cryptosRouter)
app.use('/api/v0/coins', checkJwt, coinsRouter)
app.use('/api/v0/articles', checkJwt, articlesRouter)

module.exports = app
