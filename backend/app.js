let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')


let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/cryptocodex', {useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'Bdd connection error:'))
db.once('open', () => {
  console.log('Bdd connected !')
  // we're connected!
});

let indexRouter = require('./routes/index')
let authRouter = require('./routes/auth/auth')
let usersRouter = require('./routes/users/users')
let cryptosRouter = require('./routes/cryptos/cryptos')
let coinsRouter = require('./routes/cryptos/coins')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'doc')))

app.use('/', indexRouter)
app.use('/api/v0/auth', authRouter)
app.use('/api/v0/users', usersRouter)
app.use('/api/v0/cryptos', cryptosRouter)
app.use('/api/v0/coins', coinsRouter)



/**
 * Socket IO
 */
const io = require('socket.io-client');
const socket = io('wss://stream.binance.com:9443', {
  path: '/ws/btcusdt@ticker'
})

socket.on('connect', () => {
  console.log('socket connected : ')
  console.log(socket.id); // 'G5p5...'
})

socket.on('connect_error', (error) => {
  console.log('socket connect error : ')
  throw error
})

socket.on('connect_timeout', (timeout) => {
  console.log('socket timeout : ')
  throw timeout
})

socket.on('error', (error) => {
  console.log('socket error : ')
  throw error
})

socket.on('disconnect', (reason) => {
  console.log('socket disconnected : ')
  if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect()
  }
  // else the socket will automatically try to reconnect
})

socket.on('ping', () => {
  console.log('socket ping received : ')
  socket.emit('pong')
})


/**
 * Websocket
 */
// let WebSocket = require('ws')

// let socket = null
// try {
//   // Connexion vers un serveur HTTPS
//   // prennant en charge le protocole WebSocket over SSL ("wss://").
//   socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker")
// } catch (exception) {
//     console.error(exception)
// }

// // Récupération des erreurs.
// // Si la connexion ne s'établie pas,
// // l'erreur sera émise ici.
// socket.onerror = (error) => {
//     throw error
// };

// // Lorsque la connexion est établie.
// socket.onopen = (event) => {
//   console.log("Connected to binance websocket")

//   // Lorsque la connexion se termine.
//   this.onclose = (event) => {
//     console.log("Disconnected")
//   };

//   // Lorsque le serveur envoi un message.
//   this.onmessage = (event) => {

//     console.log("Data :", event.data)
//   };
// };

module.exports = app
