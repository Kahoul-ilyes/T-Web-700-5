let express = require('express')
let router = express.Router()
let Article = require('../../models/article')
// let Parser = require('rss-parser');


router.get('/rss', function(req, res) {

// let parser = new Parser();
(async () => {
 
  // let feed = await parser.parseURL('https://investing-api-eng.ambcrypto.com/feed/merge_category');
  // console.log(feed.title);
 
  // feed.items.forEach(item => {
  //   console.log(item.title + ':' + item.link)
  // });
 
})();
});
//datas.keywords


module.exports = router