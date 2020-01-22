let express = require('express')
let router = express.Router()
let Article = require('../../models/article')
let Parser = require('rss-parser')
let User = require('../../models/user')
//test feed read module
// let feed = require('feed-read')

 //Rss adress book management
    //default adressbook
 let defaultAdressBook = [
  // "https://blocknews.fr/feed/",
  // "https://investing-api-eng.ambcrypto.com/feed/merge_category",
  "https://cointelegraph.com/rss"
]
    //adressbook + user added adresses
let adressBook= defaultAdressBook
let userKeywords= []


// get user interest keywords, scan rss flux, send back to front concerned articles
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
router.get('/:id', function(req, res) {
// check if logged in
// if (!req.body.isLogged) {
// }

// if logged in, get user keywords
  userKeywords = User.findById(req.params.id, 'keywords', (err, doc) => {
    if (err) throw err
    // console.log(doc)

    if (doc) {
      userKeywords = doc.keywords

    } else {
      res.json({err: 'No user found with this id.'})
    }
  })

// scan rss content
let parser = new Parser();
(async () => {

  // scan rss for each adress
  for (let j = 0; j<adressBook.length; j++){
  feed = await parser.parseURL(adressBook[j]);


//  check if key words exist within RSS content
  feed.items.forEach(item => {
    console.log(item)
    // store item in dbb, working but need overall feedback, not only one article
    Article.create(item, (err, article) => {
      if (err) throw err
      else {
        res.json({article: article, msg: 'Article created successfully.'})
      }
      })

      // console.log(userKeywords)
      // console.log(userKeywords.length)
      // console.log(item)


    // for(var i = 0; i < userKeywords.length; i++) {
     
    //   let pick = (item, userKeywords) => {
    //     console.log(pick)
    //     return Object.keys(item).reduce((r, e) => {
    //       if (typeof item[e] == 'object') Object.assign(r, pick(item[e], userKeywords[i]))
    //       if (e.includes(key)) r[e] = obj[e]
    //       console.log(r)
    //     }, {})}

    // if ((new RegExp("\\b" + userKeywords[i] + "\\b", "i").test(item))){
  
    //   console.log(item)

      
    //}
	//item.title + ':' + item.link
  });
};
 
})();
});


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
router.get('/articles/:id', function(req, res, next) {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Article.findById(req.params.id, (err, article) => {
    if (err) throw err

    if (article) {
      res.json({article: article})
    } else {
      res.json({err: 'No article found with this id.'})
    }
  })
});

// delete an article
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Article.findOneAndDelete(req.params.id, (err, article) => {
    if (err) throw err

    if (article) {
      res.json({_id: req.params.id, msg: 'Article deleted successfully.'})
    } else {
      res.json({err: 'No article found with this id.'})
    }
  })
})



module.exports = router