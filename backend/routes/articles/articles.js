let express = require('express')
let router = express.Router()
let Article = require('../../models/article')
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
// user key words
// let userKeywords = []
// check if article is already added this time

//get rss feed and store it, aimed for a job
router.get('/rss/', function (req, res) {
  let articleAddedCount = 0
  // scan rss content
  let parser1 = new Parser();
  (async () => {

    // scan rss for every adresses
    for (let j = 0; j < adressBook.length; j++) {
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

router.get('/', function (req, res) {

  if (req.query.keywords){
  let userKeywords = req.query.keywords.split(',')
  if (userKeywords > 0) {

    if (userkeywords) {
      returnArticles(userkeywords, (articlesToReturn) => {
        console.log("RETURN : ", articlesToReturn)
        console.log("user found with this id and has keywords")
        res.json({
          articles: articlesToReturn
        })
      })


    }
  }} else {

    console.log('No user found with this id, default: no keywords')
    Article.find({}, function (err, result) {
      if (err) throw err;
      res.json({
        articles: result
      })
    });
  }
})






function returnArticles(userKeywords, callback) {
  // let articlesToTest=[]
  let articlesToReturn = []

  //get every article to test
  Article.find({}, (err, result) => {
    if (err) throw err;
    for (let i = 0; i < userKeywords.length; i++) {
      let keywordIsPresent = false;
      for (let l = 0; l < result.length; l++) {
        for (const key in result[l]) {
          if (result[l].hasOwnProperty(key) && !keywordIsPresent) {
            const value = result[l][key]
            const regExpTest = new RegExp("(" + userKeywords[i] + ")", "gi")
            // console.log("Keyword" ,userKeywords[i])
            // console.log("Value ", value)

            if (value && ((value.title && regExpTest.test(value.title)) || (value.content && regExpTest.test(value.content)))) {
              keywordIsPresent = true;
              // console.log("test test test"+result[l])
              articlesToReturn.push(result[l])
            }
          }
        }
      }
    }
    // console.log("RETURN ", articlesToReturn)
    callback(articlesToReturn)
  })



}


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
router.get('/:id', function (req, res, next) {
  if (!req.params.id) res.json({
    err: 'Please provide an id param.'
  })

  Article.findOne({
    _id: req.params.id
  }, (err, article) => {
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