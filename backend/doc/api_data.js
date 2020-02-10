define({ "api": [
  {
    "type": "delete",
    "url": "/articles/:id",
    "title": "Delete an article by ID",
    "name": "DeleteArticleByID",
    "group": "Articles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>article's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"_id\": \"5e399a82b2745b6f3ad4e8ac\",\n    \"msg\": \"Article deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/articles/articles.js",
    "groupTitle": "Articles"
  },
  {
    "type": "get",
    "url": "articles/rss",
    "title": "Job to store articles in database from RSS feeds",
    "name": "GetAndStoreRSSFeed",
    "group": "Articles",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"msg\": \"0 added successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/articles/articles.js",
    "groupTitle": "Articles"
  },
  {
    "type": "get",
    "url": "/articles/:id",
    "title": "Get an article by ID",
    "name": "GetArticleByID",
    "group": "Articles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>article's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n {\n    \"article\": {\n        \"_id\": \"5e396beecc473d49e9d64f98\",\n        \"title\": \"Le Bitcoin atteindra 250 000 Dollars en 2023 ?\",\n        \"link\": \"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\",\n        \"pubDate\": \"2019-05-19T14:22:43.000Z\",\n        \"content:encoded\": \"\\n<p>Alors que Bitcoin repart vers le Nord en atteignant les 8 300 $ il y a quelques jours, <strong>Tim Draper</strong> fondateur du fonds capital-risque <strong>Draper Fisher Jurvetson</strong> partage ses prévisions optimistes sur la futur valeur du BTC.<br></p>\\n\\n\\n\\n<p>Après avoir misé sur <strong>Tesla</strong> et <strong>Skype</strong> à ses débuts, l’investisseur milliardaire avait acheté en 2014 lors d’une enchère 30 000 Bitcoin aux services <strong>Américains Marshals</strong> pour une valeur avoisinant les 19 millions de dollars.</p>\\n\\n\\n\\n<p>Il investit fin 2018 dans la Start-up <strong>OpenNode</strong> qui développe une plateforme de paiement bitcoin avec le <strong>Lightning Network. </strong><br></p>\\n\\n\\n\\n<h2><strong>250 000 Dollars en 2023</strong><br></h2>\\n\\n\\n\\n<p>D&rsquo;après lui, Bitcoin représentera environ 5% du marché mondial dans 4 ans,</p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>C&rsquo;est une meilleure monnaie, elle est décentralisée, elle est accessible est transparente, tout le monde sait ce qui se passe sur la blockchain.</p></blockquote>\\n\\n\\n\\n<p></p>\\n\\n\\n\\n<h4><strong>Une vision plus objective et argumenté que celle de John McAfee </strong><br></h4>\\n\\n\\n\\n<p><strong>Une monnaie qui simplifie les échanges ?</strong><br></p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>Je souhaite éventuellement disposer d&rsquo;un fonds où je reçois en bitcoin et je finance tout le monde en bitcoin, ils paient leurs employés et leurs fournisseurs en bitcoins, puis je paye mes investisseurs en bitcoin… Car je n&rsquo;aurais alors besoin d&rsquo;aucune comptabilité, d&rsquo;aucune comptabilité légale, d&rsquo;aucune comptabilité, pas de garde &#8211; tout serait fait.<br></p></blockquote>\\n\\n\\n\\n<p><strong>Des technologies qui pourraient bouleverser les Etats ?</strong><br></p>\\n\\n\\n\\n<p>Il insiste sur le fait que les cryptomonnaies une fois regroupées avec d’autres technologies pourraient révolutionner le fonctionnement des gouvernements et des administrations.</p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>Vous pouvez remplacer l&rsquo;intégralité des bureaucrates par une intelligence artificielle, un contrat intelligent et la blockchain.</p></blockquote>\\n<p>L’article <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\\\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr\\\">Blocknews</a>.</p>\\n\",\n        \"comments\": \"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/#respond\",\n        \"content\": \"<p>La lune ne sera qu'une escale pour le Bitcoin d’après Tim Draper. </p>\\n<p>L’article <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\\\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr\\\">Blocknews</a>.</p>\\n\",\n        \"image\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png\",\n        \"createdAt\": \"2020-02-04T13:04:46.109Z\",\n        \"updatedAt\": \"2020-02-04T13:04:46.109Z\",\n        \"__v\": 0\n    }\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/articles/articles.js",
    "groupTitle": "Articles"
  },
  {
    "type": "get",
    "url": "/articles/?keywords=ethereum,tesla",
    "title": "Get articles by keywords",
    "name": "GetArticlesByKeywords",
    "group": "Articles",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"articles\": [\n        {\n            \"enclosure\": {\n                \"url\": \"http://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9iZTdkMjgyMTQ3NzFlZjFiNDhjNGRjNGExMjg1NmVmMC5qcGc=.jpg\",\n                \"length\": \"528\",\n                \"type\": \"image/jpg\"\n            },\n            \"_id\": \"5e3848eb4993f6607cbddc89\",\n            \"title\": \"Bitcoin Futures: Volatility ‘Coming’ as BitMEX Hits $1B Open Interest\",\n            \"link\": \"https://cointelegraph.com/news/bitcoin-futures-volatility-coming-as-bitmex-hits-1b-open-interest\",\n            \"pubDate\": \"2020-02-03T10:17:00.000Z\",\n            \"content\": \"\\n                <img src=\\\"https://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9iZTdkMjgyMTQ3NzFlZjFiNDhjNGRjNGExMjg1NmVmMC5qcGc=.jpg\\\"><p>Bitcoin should see a “significant” price move on the back of futures strength, one analyst believes</p>\\n            \",\n            \"image\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png\",\n            \"createdAt\": \"2020-02-03T16:23:07.120Z\",\n            \"updatedAt\": \"2020-02-03T16:23:07.120Z\",\n            \"__v\": 0\n        },\n        {\n            \"enclosure\": {\n                \"url\": \"http://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9lY2U5MTJkMGU5NGU1NTkyNzRkNzZiM2QwZDRiNDJmZC5qcGc=.jpg\",\n                \"length\": \"528\",\n                \"type\": \"image/jpg\"\n            },\n            \"_id\": \"5e305c87fb9c575ebb88e993\",\n            \"title\": \"New Research Shows Bitcoin-Denominated Payments Still a ‘Fantasy’\",\n            \"link\": \"https://cointelegraph.com/news/new-research-shows-bitcoin-denominated-payments-still-a-fantasy\",\n            \"pubDate\": \"2020-01-27T12:23:00.000Z\",\n            \"content\": \"\\n                <img src=\\\"https://images.cointelegraph.com/images/528_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9lY2U5MTJkMGU5NGU1NTkyNzRkNzZiM2QwZDRiNDJmZC5qcGc=.jpg\\\"><p>A recent report by BitMEX states that the increasing decimal precision of Bitcoin outputs means that it is far from unit of account status</p>\\n            \",\n            \"image\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png\",\n            \"createdAt\": \"2020-01-28T16:08:39.777Z\",\n            \"updatedAt\": \"2020-01-28T16:08:39.777Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5e305b9dfc98015dbb8101e6\",\n            \"title\": \"Le Bitcoin atteindra 250 000 Dollars en 2023 ?\",\n            \"link\": \"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\",\n            \"pubDate\": \"2019-05-19T14:22:43.000Z\",\n            \"content:encoded\": \"\\n<p>Alors que Bitcoin repart vers le Nord en atteignant les 8 300 $ il y a quelques jours, <strong>Tim Draper</strong> fondateur du fonds capital-risque <strong>Draper Fisher Jurvetson</strong> partage ses prévisions optimistes sur la futur valeur du BTC.<br></p>\\n\\n\\n\\n<p>Après avoir misé sur <strong>Tesla</strong> et <strong>Skype</strong> à ses débuts, l’investisseur milliardaire avait acheté en 2014 lors d’une enchère 30 000 Bitcoin aux services <strong>Américains Marshals</strong> pour une valeur avoisinant les 19 millions de dollars.</p>\\n\\n\\n\\n<p>Il investit fin 2018 dans la Start-up <strong>OpenNode</strong> qui développe une plateforme de paiement bitcoin avec le <strong>Lightning Network. </strong><br></p>\\n\\n\\n\\n<h2><strong>250 000 Dollars en 2023</strong><br></h2>\\n\\n\\n\\n<p>D&rsquo;après lui, Bitcoin représentera environ 5% du marché mondial dans 4 ans,</p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>C&rsquo;est une meilleure monnaie, elle est décentralisée, elle est accessible est transparente, tout le monde sait ce qui se passe sur la blockchain.</p></blockquote>\\n\\n\\n\\n<p></p>\\n\\n\\n\\n<h4><strong>Une vision plus objective et argumenté que celle de John McAfee </strong><br></h4>\\n\\n\\n\\n<p><strong>Une monnaie qui simplifie les échanges ?</strong><br></p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>Je souhaite éventuellement disposer d&rsquo;un fonds où je reçois en bitcoin et je finance tout le monde en bitcoin, ils paient leurs employés et leurs fournisseurs en bitcoins, puis je paye mes investisseurs en bitcoin… Car je n&rsquo;aurais alors besoin d&rsquo;aucune comptabilité, d&rsquo;aucune comptabilité légale, d&rsquo;aucune comptabilité, pas de garde &#8211; tout serait fait.<br></p></blockquote>\\n\\n\\n\\n<p><strong>Des technologies qui pourraient bouleverser les Etats ?</strong><br></p>\\n\\n\\n\\n<p>Il insiste sur le fait que les cryptomonnaies une fois regroupées avec d’autres technologies pourraient révolutionner le fonctionnement des gouvernements et des administrations.</p>\\n\\n\\n\\n<blockquote class=\\\"wp-block-quote\\\"><p>Vous pouvez remplacer l&rsquo;intégralité des bureaucrates par une intelligence artificielle, un contrat intelligent et la blockchain.</p></blockquote>\\n<p>L’article <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\\\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr\\\">Blocknews</a>.</p>\\n\",\n            \"comments\": \"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/#respond\",\n            \"content\": \"<p>La lune ne sera qu'une escale pour le Bitcoin d’après Tim Draper. </p>\\n<p>L’article <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr/le-bitcoin-atteindra-250-000-dollars-en-2023/\\\">Le Bitcoin atteindra 250 000 Dollars en 2023 ?</a> est apparu en premier sur <a rel=\\\"nofollow\\\" href=\\\"https://blocknews.fr\\\">Blocknews</a>.</p>\\n\",\n            \"image\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png\",\n            \"createdAt\": \"2020-01-28T16:04:45.177Z\",\n            \"updatedAt\": \"2020-01-28T16:04:45.177Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/articles/articles.js",
    "groupTitle": "Articles"
  },
  {
    "type": "get",
    "url": "/coins/",
    "title": "Get the available coin list and update database",
    "name": "GetCoin",
    "group": "Coin",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"Database updated succesfully with the available coin list.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/coins.js",
    "groupTitle": "Coin"
  },
  {
    "type": "get",
    "url": "/cryptos/count(?available=true)",
    "title": "Count all cryptos",
    "name": "CountCryptos",
    "group": "Crypto",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"count\": 4500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto"
  },
  {
    "type": "delete",
    "url": "/cryptos/:id",
    "title": "Remove an crypto",
    "name": "DeleteCrypto",
    "group": "Crypto",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Crypto's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"567897656zqdjqld\",\n  \"msg\": \"Crypto deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CryptoNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/cryptos/:id",
    "title": "Request a crypto",
    "name": "GetCrypto",
    "group": "Crypto",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Crypto's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC\",\n    \"currentPrice\": 8000,\n    \"openingPrice\": 7900,\n    \"lowestPrice\": 7870,\n    \"highestPrice\": 8500,\n    \"supply\": 18000000,\n    \"marketCap\": 37800450789,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\",\n    \"isTradable\": true,\n    \"isAvailable\": true\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CryptoNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/cryptos/:id/prices",
    "title": "Request a crypto's prices",
    "name": "GetCryptoPrices",
    "group": "Crypto",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Crypto's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"currentPrice\": 8000,\n  \"openingPrice\": 7900,\n  \"lowestPrice\": 7870,\n  \"highestPrice\": 8500,\n  \"supply\": 18000000,\n  \"marketCap\": 37800450789\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CryptoNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/cryptos(?cryptos=BTC,ETH)(?ids=ObjectID1,ObjectID2,ObjectID3)(?available=true)(&offset=0)(&limit=1000)",
    "title": "Request all cryptos",
    "name": "GetCryptos",
    "group": "Crypto",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"cryptos\": [\n    {\n      \"_id\": \"567897656zqdjqld\",\n      \"name\": \"Bitcoin\",\n      \"acronym\": \"BTC\",\n      \"currentPrice\": 8000,\n      \"openingPrice\": 7900,\n      \"lowestPrice\": 7870,\n      \"highestPrice\": 8500,\n      \"supply\": 18000000,\n      \"marketCap\": 37800450789,\n      \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n      \"website\": \"https://bitcoin.org/fr/\",\n      \"isTradable\": true,\n      \"isAvailable\": true\n    },\n    {\n      \"_id\": \"5193bqzdiu68dbq\",\n      \"name\": \"Ethereum\",\n      \"acronym\": \"ETH\",\n      \"currentPrice\": 200,\n      \"openingPrice\": 190,\n      \"lowestPrice\": 170,\n      \"highestPrice\": 210,\n      \"supply\": 98000000,\n      \"marketCap\": 245679900,\n      \"logo\": \"https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png\",\n      \"website\": \"https://ethereum.org/fr/\",\n      \"isTradable\": true,\n      \"isAvailable\": true\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto"
  },
  {
    "type": "post",
    "url": "/cryptos/",
    "title": "Create a new crypto",
    "name": "PostCrypto",
    "group": "Crypto",
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Bitcoin\",\n  \"acronym\": \"BTC\",\n  \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n  \"website\": \"https://bitcoin.org/fr/\",\n  \"currentPrice\": 8000,\n  \"openingPrice\": 7900,\n  \"lowestPrice\": 7870,\n  \"highestPrice\": 8500,\n  \"supply\": 18000000,\n  \"marketCap\": 37800450789,\n  \"isAvailable\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC\",\n    \"currentPrice\": 8000,\n    \"openingPrice\": 7900,\n    \"lowestPrice\": 7870,\n    \"highestPrice\": 8500,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\",\n    \"isTradable\": true,\n    \"isAvailable\": true\n  },\n  \"msg\": \"Crypto created successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto"
  },
  {
    "type": "put",
    "url": "/cryptos/:id",
    "title": "Update an existing crypto",
    "name": "PutCrypto",
    "group": "Crypto",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Crypto's unique ID.</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"acronym\": \"BTC2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC2\",\n    \"currentPrice\": 80000000000,\n    \"openingPrice\": 79000000000,\n    \"lowestPrice\": 787000000000,\n    \"highestPrice\": 85000000000,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\",\n    \"isTradable\": true,\n    \"isAvailable\": true\n  },\n  \"msg\": \"Crypto updated successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CryptoNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/cryptos/subscribe?cryptos=BTC,eth,Ltc,aTom,...",
    "title": "Subscribe to cryptos in real-time ticker",
    "name": "SubscribeCryptosTicker",
    "group": "Crypto",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"Cryptos subscribed succesfully\",\n  \"streams\": ['btcusdt@ticker', 'ltcusdt@ticker', 'ethusdt@ticker', ...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cryptos/cryptos.js",
    "groupTitle": "Crypto"
  },
  {
    "type": "delete",
    "url": "/rss/:id",
    "title": "Remove a rss",
    "name": "DeleteRss",
    "group": "Rss",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Rss's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"567897656zqdjqld\",\n  \"msg\": \"Rss deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rss/rss.js",
    "groupTitle": "Rss",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RssNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/rss",
    "title": "Request all rss",
    "name": "GetAllRss",
    "group": "Rss",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"rss\": [\n    {\n      \"_id\": \"QJIOdiqejoid478921399\",\n      \"isFetchable\": true,\n      \"url\": \"https://bitcoin.org/rss\"\n    },\n    {\n      \"_id\": \"pJIldiqejoidc7892é399\",\n      \"isFetchable\": false,\n      \"url\": \"https://fakenews.org/rss\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rss/rss.js",
    "groupTitle": "Rss"
  },
  {
    "type": "get",
    "url": "/rss/:id",
    "title": "Request a rss",
    "name": "GetOneRss",
    "group": "Rss",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Rss's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"rss\": {\n    \"_id\": \"QJIOdiqejoid478921399\",\n    \"isFetchable\": true,\n    \"url\": \"https://bitcoin.org/rss\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rss/rss.js",
    "groupTitle": "Rss",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CryptoNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/rss/",
    "title": "Create a new rss",
    "name": "PostRss",
    "group": "Rss",
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"isFetchable\": true,\n  \"url\": \"https://bitcoin.org/rss\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"rss\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"isFetchable\": true,\n    \"url\": \"https://bitcoin.org/rss\"\n  },\n  \"msg\": \"Rss created successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rss/rss.js",
    "groupTitle": "Rss"
  },
  {
    "type": "put",
    "url": "/rss/:id",
    "title": "Update an existing rss",
    "name": "PutRss",
    "group": "Rss",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Rss's unique ID.</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"isFetchable\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"rss\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"isFetchable\": false,\n    \"url\": \"https://bitcoin.org/rss\"\n  },\n  \"msg\": \"Rss updated successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rss/rss.js",
    "groupTitle": "Rss",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RssNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Remove an user",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"auth0|567897656zqdjqld\",\n  \"msg\": \"User deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request an user",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"user\": {\n      \"created_at\": \"2020-01-28T12:40:23.511Z\",\n      \"email\": \"toto@yopmail.com\",\n      \"email_verified\": false,\n      \"identities\": [\n          {\n              \"user_id\": \"5e302bb72d8bd60e7a2b2f19\",\n              \"provider\": \"auth0\",\n              \"connection\": \"Username-Password-Authentication\",\n              \"isSocial\": false\n          }\n      ],\n      \"user_metadata\": {\n          \"currency\": \"USD\",\n          \"cryptos\": [],\n          \"keywords\": [\n              \"Bitcoin\",\n              \"dollar\",\n              \"Cointelegraph\"\n          ]\n      },\n      \"name\": \"toto@yopmail.com\",\n      \"nickname\": \"toto\",\n      \"picture\": \"https://s.gravatar.com/avatar/5e97dde8285093128059298e52eeeb55?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fto.png\",\n      \"updated_at\": \"2020-01-28T12:40:23.985Z\",\n      \"user_id\": \"auth0|5e302bb72d8bd60e7a2b2f19\",\n      \"username\": \"toto\",\n      \"last_ip\": \"163.5.170.74\",\n      \"last_login\": \"2020-01-28T12:40:23.985Z\",\n      \"logins_count\": 1\n  },\n  \"roles\": [\n    {\n      \"id\": \"AIqsjqeiodfjop356789\",\n      \"name\": \"basic\",\n      \"description\": \"trololol role basic utilisateur\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id/cryptos",
    "title": "Request an user's cryptos",
    "name": "GetUserCryptos",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"cryptos\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id/keywords",
    "title": "Request an user's keywords",
    "name": "GetUserKeywords",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"keywords\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request an user's roles",
    "name": "GetUserRoles",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"roles\": ['basic', 'admin']\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request all users",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"users\": [\n    user1,\n    user2\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/:id/initialize",
    "title": "Initialize a new user",
    "name": "InitializeUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n  },\n  \"msg\": \"User initialized successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/",
    "title": "Create a new user",
    "name": "PostUser",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"Newuser\",\n  \"email\": \"newuser@yopmail.com\",\n  \"password\": \"myawesomepassword\",\n  \"cryptos\": [],\n  \"currency\": \"AUS\",\n  \"keywords\": [\"bictoin\", \"lightning\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"_id\": \"47ADLKeqdmzah7A9E\",\n    \"username\": \"Newuser\",\n    \"email\": \"newuser@yopmail.com\",\n    \"currency\": \"AUS\",\n    \"cryptos\": [],\n    \"keywords\": [\"bictoin\", \"lightning\"]\n  },\n  \"msg\": \"User created successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update an existing user",
    "name": "PutUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"tata@yopmail.com\",\n  \"currency\": \"AUS\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"username\": \"Toto\",\n    \"email\": \"tata@yopmail.com\",\n    \"currency\": \"AUS\",\n    \"cryptos\": [],\n    \"keywords\": []\n  },\n  \"msg\": \"User updated successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Please provide an id param.</p>"
          }
        ]
      }
    }
  }
] });
