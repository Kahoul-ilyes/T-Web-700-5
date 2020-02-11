let express = require('express')
let router = express.Router()

let Crypto = require('../../models/crypto')

const scrapeIt = require("scrape-it")

const cryptos = [
  'bitcoin',
  'ethereum',
  'bnb',
  'bitcoin-cash',
  'ethereum-classic',
  'litecoin',
  'eos',
  'ripple',
  'chainlink',
  'BUSD',
  'tronix',
  'ontology',
  'tezos',
  'waves',
  'cardano',
  'zcash',
  'neo',
  'true-usd',
  'stellar',
  'dash',
  'usdc',
  'matic-network',
  'cosmos',
  'WRX',
  'algo',
  'basic-attention-token',
  'icon',
  'vechain',
  'miota',
  'OGN',
  'lisk',
  'qtum',
  'monero',
  'fetch.ai',
  'paxos-standard',
  'ravencoin',
  'bittorent(btt)',
  'perlin',
  'lto-network',
  'dogecoin',
  'erd',
  'enjin-coin',
  '0x',
  'ftt',
  'WINk',
  'Holo',
  'nano',
  'theta-token',
  'beam',
  'zilliqa',
  'HBAR',
  'metal',
  'celer-token',
  'omisego',
  'kava',
  'tomochain',
  'stacks',
  'harmony',
  'dock',
  'wan',
  'drep',
  'troy',
  'dusk-network',
  'arpa-chain',
  'fantom',
  'chiliz',
  'band',
  'civic',
  'iotex',
  'theta-fuel',
  'nuls',
  'mithril',
  'dent',
  'nkn',
  'contentos',
  'pundi-x',
  'cocos',
  'mainframe',
  'hshare',
  'bitshares',
  'funfair',
  'republic-protocol',
  'iexecrlc',
  'gifto',
  'tokenclub token',
  'cortex',
  'ONG',
  'mco',
  'storm',
  'vite',
  'bancor',
  'stableusd'
]

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

  for (const crypto of cryptos) {
    scrapeIt(`https://info.binance.com/en/currencies/${crypto}`, {
      name: ".instro",
      symbol: ".cryptoName > h1:nth-child(2)",
      logo: {
        selector: ".cryptoName > img:nth-child(1)",
        attr: "src"
      },
      website: {
        selector: "div.infoline:nth-child(2) > a:nth-child(2)",
        attr: "href"
      },
      currentPrice: ".ix71fe-7",
      marketCap: ".ix71fe-6 > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2)",
      supply: ".ix71fe-6 > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2)",
      dateAvailability: ".ix71fe-6 > ul:nth-child(1) > li:nth-child(4) > div:nth-child(2)"
    })
    .then(({data, response}) => {
      if(response.statusCode == 200) {
        let datas = {
          name: data['name'],
          symbol: data['symbol'],
          currentPrice: parseFloat(data['currentPrice'].replace('$','')),
          marketCap: parseInt(data['marketCap'].replace('$','').split(',').join('')),
          supply: parseInt(data['supply'].split(',').join('')),
          logo: data['logo'],
          website: data['website'],
          dateAvailability: data['dateAvailability'] != '-' ? new Date(data['dateAvailability']) : new Date(),
          isTradable: true,
          isAvailable: true
        }

        Crypto.findOneAndUpdate({name: data['name']}, datas, {upsert: true, runValidators: true}, (err, crypto) => {
          if (err) throw err
          else {
            if (crypto) {
              console.log(`Crypto ${data['name']} added/updated successfully.`)
            }
          }
        })
      }
    })
  }
  res.json({msg: 'Crypto is updating, please wait...'})

})

module.exports = router
