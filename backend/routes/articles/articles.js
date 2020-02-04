let express = require('express')
let router = express.Router()
let Article = require('../../models/article')
let Rss = require('../../models/rss')
let Parser = require('rss-parser')
//test feed read module
// let feed = require('feed-read')

//Rss adress book management
//default adressbook
let defaultAdressBook = [
  "https://blocknews.fr/feed/",
  "https://cointelegraph.com/rss"
]
//adressbook + user added adresses
let adressBook = defaultAdressBook



// check if article is already added this time

//get rss feed and store it, aimed for a job

/**
 * @api {get} /rss Job to store articles in database from RSS feeds 
 * @apiName GetAndStoreRSSFeed
 * @apiGroup Articles
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "msg": "0 added successfully!"
}
 */


router.get('/rss/', function (req, res) {

  Rss.find({}, async function (err, result) {
    if (err) throw err;
    result.forEach(item => {
      if (!adressBook.includes(item.url)) {
        adressBook.push(item.url)
      }

    })
  })
  console.log("adress book status ", adressBook)
  let articleAddedCount = 0
  // scan rss content
  let parser1 = new Parser();
  (async () => {

    // scan rss for every adresses
    for (let j = 0; j < adressBook.length; j++) {
      console.log("checking on ", adressBook[j])
      feed = await parser1.parseURL(adressBook[j]);
      feed.items.forEach(item => {
        //set default image
        let imageSet = false
        item.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png"
        //find if article already exists in bdd
        Article.findOne({
          link: item.link
        }, (err, article) => {
          if (article) {
            console.log(item.link + " already exists!")
          } else {
            // set image field
            for (const key in item) {
              if (item.hasOwnProperty(key)) {
                const value = item[key];
                if (imageSet === false) {
                  let regExpImg = RegExp('"(https.*?png|bmp|jpg|gif)"', "gi").exec(value)
                  if (regExpImg) {
                    item.image = regExpImg[0]
                  }
                  imagetSet = true;
                }
              }
            }
            //store in dbb
            Article.create(item, (err, article) => {
              if (err) throw err
              else {
                console.log(item.link + " has been added successfully!")
                articleAddedCount++
              }
            })
          }
        })

      })
    }

  })()
  .then(function (result) {
    console.log(articleAddedCount + ' added successfully!')
    res.json({
      msg: articleAddedCount + ' added successfully!'
    })
  })

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get user interest keywords, scan rss flux, send back to front concerned articles or every article if no keywords
/*GET /articles[?params1=value1&...]
params: free. User MUST be logged in (OR NOT). If the user is anonymous the settings (if any) are
ignored and the last published articles are returned. If the user is logged in the settings are used to
return only the items most relevant to the user (a list of keywords might help you). You are free to define
the parameters that you think will be useful depending on the search options you offer to your users.
Here for each article, you must provide at least:
-> an id
-> a title
-> an URL of the article’s page
-> an URL of its image (if it exists) */
/**
 * @api {get} /?keywords=ethereum,tesla Get articles by keywords
 * @apiName GetArticlesByKeywords
 * @apiGroup Articles
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "articles": [
        {
            "enclosure": {
                "url": "http://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9iZTdkMjgyMTQ3NzFlZjFiNDhjNGRjNGExMjg1NmVmMC5qcGc=.jpg",
                "length": "528",
                "type": "image/jpg"
            },
            "_id": "5e3848eb4993f6607cbddc89",
            "title": "Bitcoin Futures: Volatility ‘Coming’ as BitMEX Hits $1B Open Interest",
            "link": "https://cointelegraph.com/news/bitcoin-futures-volatility-coming-as-bitmex-hits-1b-open-interest",
            "pubDate": "2020-02-03T10:17:00.000Z",
            "content": "\n                <img src=\"https://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9iZTdkMjgyMTQ3NzFlZjFiNDhjNGRjNGExMjg1NmVmMC5qcGc=.jpg\"><p>Bitcoin should see a “significant” price move on the back of futures strength, one analyst believes</p>\n            ",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png",
            "createdAt": "2020-02-03T16:23:07.120Z",
            "updatedAt": "2020-02-03T16:23:07.120Z",
            "__v": 0
        },
        {
            "enclosure": {
                "url": "http://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9lY2U5MTJkMGU5NGU1NTkyNzRkNzZiM2QwZDRiNDJmZC5qcGc=.jpg",
                "length": "528",
                "type": "image/jpg"
            },
            "_id": "5e305c87fb9c575ebb88e993",
            "title": "New Research Shows Bitcoin-Denominated Payments Still a ‘Fantasy’",
            "link": "https://cointelegraph.com/news/new-research-shows-bitcoin-denominated-payments-still-a-fantasy",
            "pubDate": "2020-01-27T12:23:00.000Z",
            "content": "\n                <img src=\"https://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9lY2U5MTJkMGU5NGU1NTkyNzRkNzZiM2QwZDRiNDJmZC5qcGc=.jpg\"><p>A recent report by BitMEX states that the increasing decimal precision of Bitcoin outputs means that it is far from unit of account status</p>\n            ",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png",
            "createdAt": "2020-01-28T16:08:39.777Z",
            "updatedAt": "2020-01-28T16:08:39.777Z",
            "__v": 0
        },
        {
            "_id": "5e305b9dfc98015dbb8101e6",
            "title": "Le Bitcoin atteindra 250 000 Dollars en 2023 ?",
            "link": "https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/",
            "pubDate": "2019-05-19T14:22:43.000Z",
            "content:encoded": "\n<p>Alors que Bitcoin repart vers le Nord en atteignant les 8 300 $ il y a quelques jours, <strong>Tim Draper</strong> fondateur du fonds capital-risque <strong>Draper Fisher Jurvetson</strong> partage ses prévisions optimistes sur la futur valeur du BTC.<br></p>\n\n\n\n<p>Après avoir misé sur <strong>Tesla</strong> et <strong>Skype</strong> à ses débuts, l’investisseur milliardaire avait acheté en 2014 lors d’une enchère 30 000 Bitcoin aux services <strong>Américains Marshals</strong> pour une valeur avoisinant les 19 millions de dollars.</p>\n\n\n\n<p>Il investit fin 2018 dans la Start-up <strong>OpenNode</strong> qui développe une plateforme de paiement bitcoin avec le <strong>Lightning Network. </strong><br></p>\n\n\n\n<h2><strong>250 000 Dollars en 2023</strong><br></h2>\n\n\n\n<p>D&rsquo;après lui, Bitcoin représentera environ 5% du marché mondial dans 4 ans,</p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>C&rsquo;est une meilleure monnaie, elle est décentralisée, elle est accessible est transparente, tout le monde sait ce qui se passe sur la blockchain.</p></blockquote>\n\n\n\n<p></p>\n\n\n\n<h4><strong>Une vision plus objective et argumenté que celle de John McAfee </strong><br></h4>\n\n\n\n<p><strong>Une monnaie qui simplifie les échanges ?</strong><br></p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>Je souhaite éventuellement disposer d&rsquo;un fonds où je reçois en bitcoin et je finance tout le monde en bitcoin, ils paient leurs employés et leurs fournisseurs en bitcoins, puis je paye mes investisseurs en bitcoin… Car je n&rsquo;aurais alors besoin d&rsquo;aucune comptabilité, d&rsquo;aucune comptabilité légale, d&rsquo;aucune comptabilité, pas de garde &#8211; tout serait fait.<br></p></blockquote>\n\n\n\n<p><strong>Des technologies qui pourraient bouleverser les Etats ?</strong><br></p>\n\n\n\n<p>Il insiste sur le fait que les cryptomonnaies une fois regroupées avec d’autres technologies pourraient révolutionner le fonctionnement des gouvernements et des administrations.</p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>Vous pouvez remplacer l&rsquo;intégralité des bureaucrates par une intelligence artificielle, un contrat intelligent et la blockchain.</p></blockquote>\n<p>L’article <a rel=\"nofollow\" href=\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\"nofollow\" href=\"https://blocknews.fr\">Blocknews</a>.</p>\n",
            "comments": "https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/#respond",
            "content": "<p>La lune ne sera qu'une escale pour le Bitcoin d’après Tim Draper. </p>\n<p>L’article <a rel=\"nofollow\" href=\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\"nofollow\" href=\"https://blocknews.fr\">Blocknews</a>.</p>\n",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png",
            "createdAt": "2020-01-28T16:04:45.177Z",
            "updatedAt": "2020-01-28T16:04:45.177Z",
            "__v": 0
        }
    ]
}
 */
router.get('/', function (req, res) {
  let userKeywordsCheck = req.query.keywords
  if (userKeywordsCheck !== undefined | userKeywordsCheck !== null) {
    let userKeywords = req.query.keywords.replace(',', ' ')
    if (userKeywords.length > 0) {

      if (userKeywords) {
        // returnArticles(userKeywords, (articlesToReturn) => {
        //   res.json({
        //     articles: articlesToReturn
        //   })
        // })
        Article.find({
          $text: {
            $search: userKeywords
          }
        }, (err, result) => {
          if (err) throw err;
          res.json({
            articles: result
          })
        })
      }
    }
  } else {

    console.log('No user found with this id, default: no keywords')
    Article.find({}, function (err, result) {
      if (err) throw err;
      res.json({
        articles: result
      })
    });
  }
})





// RIP
// function returnArticles(userKeywords, callback) {
//   // let articlesToTest=[]
//   let articlesToReturn = []

//   //get every article to test
//   Article.find({}, (err, result) => {
//     if (err) throw err;
//     for (let i = 0; i < userKeywords.length; i++) {
//       let keywordIsPresent = false;
//       for (let l = 0; l < result.length; l++) {
//         for (const key in result[l]) {
//           if (result[l].hasOwnProperty(key) && !keywordIsPresent) {
//             const value = result[l][key]
//             const regExpTest = new RegExp("(" + userKeywords[i] + ")", "gi")
//             // console.log("Keyword" ,userKeywords[i])
//             // console.log("Value ", value)

//             if (value && ((value.title && regExpTest.test(value.title)) || (value.content && regExpTest.test(value.content)) || (value["content:encoded"] && regExpTest.test(value["content:encoded"])))) {
//               keywordIsPresent = true;
//               console.log("test test test" + result[l])
//               articlesToReturn.push(result[l])
//             }
//           }
//         }
//       }
//     }
//     // console.log("RETURN ", articlesToReturn)
//     callback(articlesToReturn)
//   })



// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /articles/{id}
// id: the Id of an article. The user MUST be logged in (OR NOT). Returns information about an article,
// which is at least:
// -> the article Id
// -> the title
// -> its summary
// -> its source
// -> its date
// -> the URL of the article’s page
// -> the URL of its image (if it exists)

/**
 * @api {get} /:id Get an article by ID
 * @apiName GetArticleByID
 * @apiGroup Articles
 *
 * @apiParam {ObjectId} id article's unique ID.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 {
    "article": {
        "_id": "5e396beecc473d49e9d64f98",
        "title": "Le Bitcoin atteindra 250 000 Dollars en 2023 ?",
        "link": "https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/",
        "pubDate": "2019-05-19T14:22:43.000Z",
        "content:encoded": "\n<p>Alors que Bitcoin repart vers le Nord en atteignant les 8 300 $ il y a quelques jours, <strong>Tim Draper</strong> fondateur du fonds capital-risque <strong>Draper Fisher Jurvetson</strong> partage ses prévisions optimistes sur la futur valeur du BTC.<br></p>\n\n\n\n<p>Après avoir misé sur <strong>Tesla</strong> et <strong>Skype</strong> à ses débuts, l’investisseur milliardaire avait acheté en 2014 lors d’une enchère 30 000 Bitcoin aux services <strong>Américains Marshals</strong> pour une valeur avoisinant les 19 millions de dollars.</p>\n\n\n\n<p>Il investit fin 2018 dans la Start-up <strong>OpenNode</strong> qui développe une plateforme de paiement bitcoin avec le <strong>Lightning Network. </strong><br></p>\n\n\n\n<h2><strong>250 000 Dollars en 2023</strong><br></h2>\n\n\n\n<p>D&rsquo;après lui, Bitcoin représentera environ 5% du marché mondial dans 4 ans,</p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>C&rsquo;est une meilleure monnaie, elle est décentralisée, elle est accessible est transparente, tout le monde sait ce qui se passe sur la blockchain.</p></blockquote>\n\n\n\n<p></p>\n\n\n\n<h4><strong>Une vision plus objective et argumenté que celle de John McAfee </strong><br></h4>\n\n\n\n<p><strong>Une monnaie qui simplifie les échanges ?</strong><br></p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>Je souhaite éventuellement disposer d&rsquo;un fonds où je reçois en bitcoin et je finance tout le monde en bitcoin, ils paient leurs employés et leurs fournisseurs en bitcoins, puis je paye mes investisseurs en bitcoin… Car je n&rsquo;aurais alors besoin d&rsquo;aucune comptabilité, d&rsquo;aucune comptabilité légale, d&rsquo;aucune comptabilité, pas de garde &#8211; tout serait fait.<br></p></blockquote>\n\n\n\n<p><strong>Des technologies qui pourraient bouleverser les Etats ?</strong><br></p>\n\n\n\n<p>Il insiste sur le fait que les cryptomonnaies une fois regroupées avec d’autres technologies pourraient révolutionner le fonctionnement des gouvernements et des administrations.</p>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>Vous pouvez remplacer l&rsquo;intégralité des bureaucrates par une intelligence artificielle, un contrat intelligent et la blockchain.</p></blockquote>\n<p>L’article <a rel=\"nofollow\" href=\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\"nofollow\" href=\"https://blocknews.fr\">Blocknews</a>.</p>\n",
        "comments": "https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/#respond",
        "content": "<p>La lune ne sera qu'une escale pour le Bitcoin d’après Tim Draper. </p>\n<p>L’article <a rel=\"nofollow\" href=\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\"nofollow\" href=\"https://blocknews.fr\">Blocknews</a>.</p>\n",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png",
        "createdAt": "2020-02-04T13:04:46.109Z",
        "updatedAt": "2020-02-04T13:04:46.109Z",
        "__v": 0
    }
}
}
 */
router.get('/:id', function (req, res, next) {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  })

  Article.findById(
    req.params.id, (err, article) => {
      if (err) throw err
      if (article) {
        res.json({
          article
        })
      } else {
        res.json({
          err: 'No article found with this id.'
        })
      }
    })
})

// delete an article
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  })

  Article.findOneAndDelete(req.params.id, (err, article) => {
    if (err) throw err

    if (article) {
      res.json({
        _id: req.params.id,
        msg: 'Article deleted successfully.'
      })
    } else {
      res.json({
        err: 'No article found with this id.'
      })
    }
  })
})



module.exports = router