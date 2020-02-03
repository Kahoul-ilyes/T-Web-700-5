let express = require('express')
let router = express.Router()
let Rss = require('../../models/rss')

/**
 * @apiDefine NoRssError
 * @apiError RssNotFound Please provide an id param.
 */

/**
 * @api {get} /rss Request all rss
 * @apiName GetAllRss
 * @apiGroup Rss
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "rss": [
 *         {
 *           "_id": "QJIOdiqejoid478921399",
 *           "isFetchable": true,
 *           "url": "https://bitcoin.org/rss"
 *         },
 *         {
 *           "_id": "pJIldiqejoidc7892é399",
 *           "isFetchable": false,
 *           "url": "https://fakenews.org/rss"
 *         }
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {

  Rss.find({}).exec((err, rss) => {
    if (err) throw err

    if (rss) res.send({ rss: rss})
    else res.send({ rss: []})
  })
})

/**
 * @api {get} /rss/:id Request a rss
 * @apiName GetOneRss
 * @apiGroup Rss
 *
 * @apiParam {ObjectId} id Rss's unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "rss": {
 *         "_id": "QJIOdiqejoid478921399",
 *         "isFetchable": true,
 *         "url": "https://bitcoin.org/rss"
 *       }
 *     }
 * @apiUse NoCryptoError
 */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Rss.findById(req.params.id, (err, rss) => {
    if (err) throw err

    if (rss) {
      res.json({rss: rss})
    } else {
      res.json({err: 'No rss found with this id.'})
    }
  })
})

/**
 * @api {post} /rss/ Create a new rss
 * @apiName PostRss
 * @apiGroup Rss
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "isFetchable": true,
 *       "url": "https://bitcoin.org/rss"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "rss": {
 *         "_id": "567897656zqdjqld",
 *         "isFetchable": true,
 *         "url": "https://bitcoin.org/rss"
 *       },
 *       "msg": "Rss created successfully."
 *     }
 */
router.post('/', (req, res, next) => {

  // mandatory
  let url = req.body.url
  // optionnal
  let isFetchable = req.body.isFetchable

  if (!url) {
    res.json({error: 'Bad request formatting, url is missing.'})
  }

  let datas = {}

  if (url) datas.url = url
  if (isFetchable != null) datas.isFetchable = isFetchable

  Rss.create(datas, (err, rss) => {
    if (err) throw err
    
    if (rss) {
      res.json({rss: rss, msg: 'Rss created successfully.'})
    } else {
      res.json({err: 'Unable to create this rss.'})
    }
  })
})

/**
 * @api {put} /rss/:id Update an existing rss
 * @apiName PutRss
 * @apiGroup Rss
 * 
 * @apiParam {ObjectId} id Rss's unique ID.
 *
 * @apiHeaderExample {json} Request-Example:
 *     {
 *       "isFetchable": false
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "rss": {
 *         "_id": "567897656zqdjqld",
 *         "isFetchable": false,
 *         "url": "https://bitcoin.org/rss"
 *       },
 *       "msg": "Rss updated successfully."
 *     }
 * @apiUse NoRssError
 */
router.put('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  // mandatory
  let url = req.body.url
  // optionnal
  let isFetchable = req.body.isFetchable

  let datas = {}

  if (url) datas.url = url
  if (isFetchable != null) datas.isFetchable = isFetchable

  Rss.findOneAndUpdate(req.params.id, datas, (err, rss) => {
    if (err) throw err

    if (rss) {
      res.json({rss: rss, msg: 'Rss updated successfully.'})
    } else {
      res.json({err: 'No rss found with this id.'})
    }
  })
})

/**
 * @api {delete} /rss/:id Remove a rss
 * @apiName DeleteRss
 * @apiGroup Rss
 *
 * @apiParam {ObjectId} id Rss's unique ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "567897656zqdjqld",
 *       "msg": "Rss deleted successfully."
 *     }
 * @apiUse NoRssError
 */
router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.json({err: 'Please provide an id param.'})

  Rss.findOneAndDelete(req.params.id, (err, rss) => {
    if (err) throw err

    if (rss) {
      res.json({_id: req.params.id, msg: 'Rss deleted successfully.'})
    } else {
      res.json({err: 'No rss found with this id.'})
    }
  })
})

module.exports = router
