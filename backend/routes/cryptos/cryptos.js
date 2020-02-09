let express = require('express')
let router = express.Router()
let websocket = require('../../socket/socket')

let Crypto = require('../../models/crypto')

// const axios = require('axios');

/**
 * @apiDefine NoCryptoError
 * @apiError CryptoNotFound Please provide an id param.
 */

/**
 * @api {get} /cryptos/subscribe?cryptos=BTC,eth,Ltc,aTom,... Subscribe to cryptos in real-time ticker
 * @apiName SubscribeCryptosTicker
 * @apiGroup Crypto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "msg": "Cryptos subscribed succesfully",
 *       "streams": ['btcusdt@ticker', 'ltcusdt@ticker', 'ethusdt@ticker', ...]
 *     }
 */
router.get('/subscribe', (req, res, next) => {

  // get subscribed cryptos
  websocket.socket.send(JSON.stringify(
    {
      method: "LIST_SUBSCRIPTIONS",
      id: 3
    }
  ))

  let cryptos = req.query.cryptos.split(',')

  if (cryptos.length > 0) {
    if (Array.isArray(cryptos)) {
      
      let streams = websocket.subscribedCryptos

      cryptos.forEach(crypto => {

        let stream = `${crypto.toLowerCase()}usdt@ticker`
        // unsubscribe from this crypto
        websocket.socket.send(JSON.stringify(
          {
            method: "UNSUBSCRIBE",
            params: [stream],
            id: 312
          }
        ))

        if (streams.indexOf(stream) == -1)
          streams.push(stream)
      })

      websocket.socket.send(JSON.stringify(
        {
          method: "SUBSCRIBE",
          params: streams,
          id: 1
        }
      ))
      
      res.json({
        msg: "Cryptos subscribed succesfully",
        cryptos: streams
      })
    } else {
      res.json({err: 'Bad request formatting.'})
    }
  } else {
    res.json({err: 'Erreur request, cryptos to subscribe are missing.'})
  }
})

/**
 * @api {get} /cryptos(?cryptos=BTC,ETH)(?ids=ObjectID1,ObjectID2,ObjectID3)(?available=true)(&offset=0)(&limit=1000) Request all cryptos
 * @apiName GetCryptos
 * @apiGroup Crypto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cryptos": [
 *         {
 *           "_id": "567897656zqdjqld",
 *           "name": "Bitcoin",
 *           "acronym": "BTC",
 *           "currentPrice": 8000,
 *           "openingPrice": 7900,
 *           "lowestPrice": 7870,
 *           "highestPrice": 8500,
 *           "supply": 18000000,
 *           "marketCap": 37800450789,
 *           "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *           "website": "https://bitcoin.org/fr/",
 *           "isTradable": true,
 *           "isAvailable": true
 *         },
 *         {
 *           "_id": "5193bqzdiu68dbq",
 *           "name": "Ethereum",
 *           "acronym": "ETH",
 *           "currentPrice": 200,
 *           "openingPrice": 190,
 *           "lowestPrice": 170,
 *           "highestPrice": 210,
 *           "supply": 98000000,
 *           "marketCap": 245679900,
 *           "logo": "https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png",
 *           "website": "https://ethereum.org/fr/",
 *           "isTradable": true,
 *           "isAvailable": true
 *         }
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {

  let query = {}
  let cryptosToRetrieve = []
  let available = null
  let offset = 0
  let limit = 0

  let request = null
  if (req.query.cryptos) {
    cryptosToRetrieve = req.query.cryptos.split(',')
  } else if (req.query.ids) {
    cryptosToRetrieve = req.query.ids.split(',')
  } else if (req.query.available) {
    available = Boolean(req.query.available)
  }

  
  if (cryptosToRetrieve.length > 0) {
    if (Array.isArray(cryptosToRetrieve)) {
      if (req.query.cryptos) {
        query = {symbol: { $in: cryptosToRetrieve }}
      } else if (req.query.ids) {
        query = {_id: { $in: cryptosToRetrieve }}
      } else if (available != null) {
        query = { isAvailable: available }
      }
    }
  }
  
  request = Crypto.find(query)
  
  if (req.query.limit) {
    limit = parseInt(req.query.limit)
    request = request.limit(limit)
  }
  if (req.query.offset) {
    offset = parseInt(req.query.offset)
    request = request.skip(offset)
  }

  request.collation( { locale: 'fr', strength: 1 } ).exec((err, cryptos) => {
    if (err) res.json({err: err})

    if (cryptos) res.send({ cryptos: cryptos})
    else res.send({ cryptos: []})
  })
})

/**
 * @api {get} /cryptos/count(?available=true) Count all cryptos
 * @apiName CountCryptos
 * @apiGroup Crypto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 4500
 *     }
 */
router.get('/count', (req, res, next) => {

  let available = true

  if (req.query.available) {
    available = Boolean(req.query.available)
  }
  
  Crypto.countDocuments({}, (err, nb) => {
    res.send({count: nb})
  })
})

/**
 * @api {get} /cryptos/:id Request a crypto
 * @apiName GetCrypto
 * @apiGroup Crypto
 *
 * @apiParam {ObjectId} id Crypto's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "crypto": {
 *         "_id": "567897656zqdjqld",
 *         "name": "Bitcoin",
 *         "acronym": "BTC",
 *         "currentPrice": 8000,
 *         "openingPrice": 7900,
 *         "lowestPrice": 7870,
 *         "highestPrice": 8500,
 *         "supply": 18000000,
 *         "marketCap": 37800450789,
 *         "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *         "website": "https://bitcoin.org/fr/",
 *         "isTradable": true,
 *         "isAvailable": true
 *       }
 *     }
 * @apiUse NoCryptoError
 */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Crypto.findById(req.params.id, (err, crypto) => {
    if (err) res.json({err: err})

    if (crypto) {
      res.json({crypto: crypto})
    } else {
      res.json({err: 'No crypto found with this id.'})
    }
  })
})

/**
 * @api {post} /cryptos/ Create a new crypto
 * @apiName PostCrypto
 * @apiGroup Crypto
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "name": "Bitcoin",
 *       "acronym": "BTC",
 *       "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *       "website": "https://bitcoin.org/fr/",
 *       "currentPrice": 8000,
 *       "openingPrice": 7900,
 *       "lowestPrice": 7870,
 *       "highestPrice": 8500,
 *       "supply": 18000000,
 *       "marketCap": 37800450789,
 *       "isAvailable": true
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "crypto": {
 *         "_id": "567897656zqdjqld",
 *         "name": "Bitcoin",
 *         "acronym": "BTC",
 *         "currentPrice": 8000,
 *         "openingPrice": 7900,
 *         "lowestPrice": 7870,
 *         "highestPrice": 8500,
 *         "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *         "website": "https://bitcoin.org/fr/",
 *         "isTradable": true,
 *         "isAvailable": true
 *       },
 *       "msg": "Crypto created successfully."
 *     }
 */
router.post('/', (req, res, next) => {

  // mandatory
  let name = req.body.name
  let acronym = req.body.acronym
  // optionnal
  let logo = req.body.logo
  let website = req.body.website
  let currentPrice = req.body.currentPrice
  let openingPrice = req.body.openingPrice
  let lowestPrice = req.body.lowestPrice
  let highestPrice = req.body.highestPrice
  let supply = req.body.supply
  let marketCap = req.body.marketCap
  let isTradable = req.body.isTradable
  let isAvailable = req.body.isAvailable

  if (!name || !acronym) {
    res.json({error: 'Bad request formatting, name or acronym is missing.'})
  }

  let datas = {}

  if (name) datas.name = name
  if (acronym) datas.acronym = acronym
  if (logo) datas.logo = logo
  if (website) datas.website = website
  if (currentPrice) datas.currentPrice = currentPrice
  if (openingPrice) datas.openingPrice = openingPrice
  if (lowestPrice) datas.lowestPrice = lowestPrice
  if (highestPrice) datas.website = highestPrice
  if (supply) datas.supply = supply
  if (marketCap) datas.marketCap = marketCap
  if (isTradable) datas.isTradable = isTradable
  if (isAvailable) datas.isAvailable = isAvailable


  Crypto.create(datas, (err, crypto) => {
    if (err) res.json({err: err})
    
    if (crypto) {
      res.json({crypto: crypto, msg: 'Crypto created successfully.'})
    } else {
      res.json({err: 'Unable to create this crypto.'})
    }
  })
})

/**
 * @api {put} /cryptos/:id Update an existing crypto
 * @apiName PutCrypto
 * @apiGroup Crypto
 * 
 * @apiParam {ObjectId} id Crypto's unique ID.
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "acronym": "BTC2"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "crypto": {
 *         "_id": "567897656zqdjqld",
 *         "name": "Bitcoin",
 *         "acronym": "BTC2",
 *         "currentPrice": 80000000000,
 *         "openingPrice": 79000000000,
 *         "lowestPrice": 787000000000,
 *         "highestPrice": 85000000000,
 *         "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *         "website": "https://bitcoin.org/fr/",
 *         "isTradable": true,
 *         "isAvailable": true
 *       },
 *       "msg": "Crypto updated successfully."
 *     }
 * @apiUse NoCryptoError
 */
router.put('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  // mandatory
  let name = req.body.name
  let acronym = req.body.acronym
  // optionnal
  let logo = req.body.logo
  let website = req.body.website
  let currentPrice = req.body.currentPrice
  let openingPrice = req.body.openingPrice
  let lowestPrice = req.body.lowestPrice
  let highestPrice = req.body.highestPrice
  let supply = req.body.supply
  let marketCap = req.body.marketCap
  let isTradable = req.body.isTradable
  let isAvailable = req.body.isAvailable

  let datas = {}

  if (name) datas.name = name
  if (acronym) datas.acronym = acronym
  if (logo) datas.logo = logo
  if (website) datas.website = website
  if (currentPrice) datas.currentPrice = currentPrice
  if (openingPrice) datas.openingPrice = openingPrice
  if (lowestPrice) datas.lowestPrice = lowestPrice
  if (highestPrice) datas.website = highestPrice
  if (supply) datas.supply = supply
  if (marketCap) datas.marketCap = marketCap
  if (isTradable) datas.isTradable = isTradable
  if (isAvailable) datas.isAvailable = isAvailable

  Crypto.findOneAndUpdate(req.params.id, datas, (err, crypto) => {
    if (err) res.json({err: err})

    if (crypto) {
      res.json({crypto: crypto, msg: 'Crypto updated successfully.'})
    } else {
      res.json({err: 'No crypto found with this id.'})
    }
  })
})

/**
 * @api {delete} /cryptos/:id Remove an crypto
 * @apiName DeleteCrypto
 * @apiGroup Crypto
 *
 * @apiParam {ObjectId} id Crypto's unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "567897656zqdjqld",
 *       "msg": "Crypto deleted successfully."
 *     }
 * @apiUse NoCryptoError
 */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Crypto.findOneAndDelete(req.params.id, (err, crypto) => {
    if (err) res.json({err: err})

    if (crypto) {
      res.json({_id: req.params.id, msg: 'Crypto deleted successfully.'})
    } else {
      res.json({err: 'No crypto found with this id.'})
    }
  })
})

/**
 * @api {get} /cryptos/:id/prices Request a crypto's prices
 * @apiName GetCryptoPrices
 * @apiGroup Crypto
 *
 * @apiParam {ObjectId} id Crypto's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "currentPrice": 8000,
 *       "openingPrice": 7900,
 *       "lowestPrice": 7870,
 *       "highestPrice": 8500,
 *       "supply": 18000000,
 *       "marketCap": 37800450789
 *     }
 * @apiUse NoCryptoError
 */
router.get('/:id/prices', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Crypto.findById(req.params.id, 'currentPrice openingPrice lowestPrice highestPrice', (err, doc) => {
    if (err) res.json({err: err})

    if (doc) {
      res.json({
        currentPrice: doc.currentPrice,
        openingPrice: doc.openingPrice,
        lowestPrice: doc.lowestPrice,
        highestPrice: doc.highestPrice,
        supply: doc.supply,
        marketCap: doc.marketCap
      })
    } else {
      res.json({err: 'No crypto found with this id.'})
    }
  })
})

module.exports = router
