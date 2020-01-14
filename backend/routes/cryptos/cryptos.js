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
 *           "currentPrice": 80000000000,
 *           "openingPrice": 79000000000,
 *           "lowestPrice": 787000000000,
 *           "highestPrice": 85000000000,
 *           "logo": "https://bitcoin.org/img/icons/logotop.svg?1577873163",
 *           "website": "https://bitcoin.org/fr/"
 *         },
 *         {
 *           "_id": "5193bqzdiu68dbq",
 *           "name": "Ethereum",
 *           "acronym": "ETH",
 *           "currentPrice": 2000000000,
 *           "openingPrice": 1900000000,
 *           "lowestPrice": 1700000000,
 *           "highestPrice": 2100000000,
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
 *         "currentPrice": 80000000000,
 *         "openingPrice": 79000000000,
 *         "lowestPrice": 787000000000,
 *         "highestPrice": 85000000000,
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
 *         "currentPrice": 80000000000,
 *         "openingPrice": 79000000000,
 *         "lowestPrice": 787000000000,
 *         "highestPrice": 85000000000,
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

  if (!name || !acronym) {
    res.json({error: 'Bad request formatting, some body params are missing.'})
  }

  let datas = {}

  if (name) datas.name = name
  if (acronym) datas.acronym = acronym
  if (logo) datas.logo = logo
  if (website) datas.website = website

  Crypto.create(datas, (err, crypto) => {
    if (err) throw err
    
    if (crypto) {
      res.json({crypto: crypto, msg: 'Crypto created successfully.'})
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
