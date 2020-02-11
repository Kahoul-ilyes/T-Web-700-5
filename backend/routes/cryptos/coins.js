let express = require('express')
let router = express.Router()

let Crypto = require('../../models/crypto')

const axios = require('axios');



/**
 * @api {get} /coins/ Get the available coin list and update database
 * @apiName GetCoin
 * @apiGroup Coin
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "msg": "Database updated succesfully with the available coin list."
 *     }
 */
router.get('/', (req, res, next) => {

  // check that this crypto is in the available coin list
  axios({
    url: 'https://min-api.cryptocompare.com/data/all/coinlist',
    method: 'get',
    headers: {
      authorization: `Apikey ${process.env.API_KEY_CRYPTO_COMPARE}`
    } 
  }).then((res) => {
    let coins = res.data.Data;
    for (const key in coins) {
      if (coins.hasOwnProperty(key)) {
        const coin = coins[key];

        let name = coin.CoinName
        let symbol = coin.Symbol
        let logo = 'https://www.cryptocompare.com' + coin.ImageUrl
        let website = 'https://www.cryptocompare.com' + coin.Url
        let isTradable = coin.IsTrading
        let dateAvailability = coin.ContentCreatedOn
        let supply = 0
        if (coin.TotalCoinsMined && coin.TotalCoinsMined != null && coin.TotalCoinsMined !== "N/A")
          supply = coin.TotalCoinsMined

        let datas = {
          name: name,
          symbol: symbol,
          logo: logo,
          website: website,
          isTradable: isTradable,
          dateAvailability: dateAvailability,
          supply: supply
        }
        Crypto.findOneAndUpdate({name: name}, datas, {upsert: true, runValidators: true}, (err, crypto) => {
          if (err) res.json({err: err})
          else {
            if (crypto) {
              console.log(`Crypto ${name} added/updated successfully.`)
            }
          }
        })
        
      }
    }
    res.json({msg: 'Crypto list updated successfully.'})
  }).catch((err) => {
    if (err) res.json({err: err})
  })

})

module.exports = router
