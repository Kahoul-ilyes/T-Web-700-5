let WebSocket = require('ws')
let Crypto = require('../models/crypto')

/**
 * Websocket
 */

let socket = null
let subscribedCryptos = []

try {
  // Connexion vers un serveur HTTPS
  // prennant en charge le protocole WebSocket over SSL ("wss://").
  socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@ticker")
} catch (exception) {
    console.error(exception)
}

// Récupération des erreurs.
// Si la connexion ne s'établie pas,
// l'erreur sera émise ici.
socket.onerror = (error) => {
    throw error
}

// Lorsque la connexion est établie.
socket.onopen = (event) => {
  console.log("Connected to binance websocket")
}

// Lorsque la connexion se termine.
socket.onclose = (event) => {
  console.log("Disconnected")
}

// Lorsque le serveur envoi un message.
socket.onmessage = (event) => {

  if (event.data.indexOf('id') > -1) {
    let data = JSON.parse(event.data)
    // subscribed coins list event
    if (data.id == 3) {
      subscribedCryptos = data.result
    }
    // unsubscribed event
    if (data.id == 312) {
      console.log('Successfully unsubscribed from all streams.')
    }
  }


  // TODO: connexion websocket between serveur and client frontend
  console.log(event.data)
  if (event.data.indexOf('stream') > -1 && event.data.indexOf('data' > -1)) {
    let data = JSON.parse(event.data)
    // save data in crypto
    let cryptoSymbol = data.data.s.replace('USDT', '')
    let prices = {
      currentPrice: parseFloat(data.data.c),
      openingPrice: parseFloat(data.data.o),
      lowestPrice: parseFloat(data.data.l),
      highestPrice: parseFloat(data.data.h)
    }

    Crypto.findOneAndUpdate({symbol: cryptoSymbol}, prices, (err, crypto) => {
      if (err) throw err
  
      if (crypto) {
        // update marketcap
        if (crypto.supply && crypto.supply != 0) {
          crypto.marketCap = parseInt(crypto.supply * parseFloat(data.data.o))
          crypto.save((err, doc) => {
            if (err) throw err
          })
        }
      }
    })
  }
}

module.exports.socket = socket
module.exports.subscribedCryptos = subscribedCryptos