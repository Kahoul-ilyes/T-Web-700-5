let express = require('express')
let router = express.Router()

let Crypto = require('../../models/crypto')

const axios = require('axios');

/**
 * @apiDefine NoCryptoError
 * @apiError CryptoNotFound Please provide an id param.
 */

/**
 * @api {get} /cryptos/ Request all cryptos
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
 *           "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *           "website": "https://bitcoin.org/fr/"
 *         },
 *         {
 *           "_id": "5193bqzdiu68dbq",
 *           "name": "Ethereum",
 *           "acronym": "ETH",
 *           "currentPrice": 200,
 *           "openingPrice": 190,
 *           "lowestPrice": 170,
 *           "highestPrice": 210,
 *           "logo": "https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png",
 *           "website": "https://ethereum.org/fr/"
 *         }
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {
  Crypto.find({}).exec((err, cryptos) => {
    if (err) throw err

    if (cryptos) res.send({ cryptos: cryptos})
    else res.send({ cryptos: []})
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
 *         "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *         "website": "https://bitcoin.org/fr/"
 *       }
 *     }
 * @apiUse NoCryptoError
 */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Crypto.findById(req.params.id, (err, crypto) => {
    if (err) throw err

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
 *       "website": "https://bitcoin.org/fr/"
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
 *         "website": "https://bitcoin.org/fr/"
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


  Crypto.create(datas, (err, crypto) => {
    if (err) throw err
    
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
 *         "website": "https://bitcoin.org/fr/"
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

  let datas = {}

  if (name) datas.name = name
  if (acronym) datas.acronym = acronym
  if (logo) datas.logo = logo
  if (website) datas.website = website
  if (currentPrice) datas.currentPrice = currentPrice
  if (openingPrice) datas.openingPrice = openingPrice
  if (lowestPrice) datas.lowestPrice = lowestPrice
  if (highestPrice) datas.website = highestPrice

  Crypto.findOneAndUpdate(req.params.id, datas, (err, crypto) => {
    if (err) throw err

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
    if (err) throw err

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
 *       "currentPrice": 80000000000,
 *       "openingPrice": 79000000000,
 *       "lowestPrice": 787000000000,
 *       "highestPrice": 85000000000
 *     }
 * @apiUse NoCryptoError
 */
router.get('/:id/prices', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Crypto.findById(req.params.id, 'currentPrice openingPrice lowestPrice highestPrice', (err, doc) => {
    if (err) throw err
    console.log(doc)

    if (doc) {
      res.json({
        currentPrice: doc.currentPrice,
        openingPrice: doc.openingPrice,
        lowestPrice: doc.lowestPrice,
        highestPrice: doc.highestPrice
      })
    } else {
      res.json({err: 'No crypto found with this id.'})
    }
  })
})

module.exports = router
