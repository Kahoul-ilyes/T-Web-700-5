let express = require('express')
let router = express.Router()
//let Article = require('../../models/article')
let Parser = require('rss-parser');

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
router.get('/articles', function(req, res) {
// check if logged in
if (!req.body.isLogged) {

}

// if logged in, get user keywords
  let userKeywords = User.findById(req.params.id, 'keywords', (err, doc) => {
    if (err) throw err
    console.log(doc)

    if (doc) {
      res.json({keywords: doc.keywords})
    } else {
      res.json({err: 'No user found with this id.'})
    }
  })

// scan rss content
let parser = new Parser();
(async () => {
 //ranger adresse
  let feed = await parser.parseURL('https://cointelegraph.com/rss');
  //https://blocknews.fr/feed/
  //https://investing-api-eng.ambcrypto.com/feed/merge_category
  //https://cointelegraph.com/rss
  //
  //
 // console.log(feed.title);
 
  feed.items.forEach(item => {
	console.log(item)
	//item.title + ':' + item.link
  });
 
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
module.exports = router