define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login an user",
    "name": "PostLogin",
    "group": "Authentification",
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"toto@yopmail.com\",\n  \"password\": \"myawesomepassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"username\": \"Toto\",\n    \"email\": \"toto@yopmail.com\",\n    \"currency\": \"EUR\",\n    \"cryptos\": [],\n    \"keywords\": []\n  },\n  \"Login successful.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth/auth.js",
    "groupTitle": "Authentification",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestFormatting",
            "description": "<p>Bad request formatting, some body params are missing.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a new user",
    "name": "PostRegister",
    "group": "Authentification",
    "header": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"Toto\",\n  \"email\": \"toto@yopmail.com\",\n  \"password\": \"myawesomepassword\",\n  \"password_confirmation\": \"myawesomepassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"username\": \"Toto\",\n    \"email\": \"toto@yopmail.com\",\n    \"currency\": \"EUR\",\n    \"cryptos\": [],\n    \"keywords\": []\n  },\n  \"msg\": \"User registered successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth/auth.js",
    "groupTitle": "Authentification",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestFormatting",
            "description": "<p>Bad request formatting, some body params are missing.</p>"
          }
        ]
      }
    }
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
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC\",\n    \"currentPrice\": 8000,\n    \"openingPrice\": 7900,\n    \"lowestPrice\": 7870,\n    \"highestPrice\": 8500,\n    \"supply\": 18000000,\n    \"marketCap\": 37800450789,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\"\n  }\n}",
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
    "url": "/cryptos(?cryptos=BTC,ETH)(?ids=ObjectID1,ObjectID2,ObjectID3)",
    "title": "Request all cryptos",
    "name": "GetCryptos",
    "group": "Crypto",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"cryptos\": [\n    {\n      \"_id\": \"567897656zqdjqld\",\n      \"name\": \"Bitcoin\",\n      \"acronym\": \"BTC\",\n      \"currentPrice\": 8000,\n      \"openingPrice\": 7900,\n      \"lowestPrice\": 7870,\n      \"highestPrice\": 8500,\n      \"supply\": 18000000,\n      \"marketCap\": 37800450789,\n      \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n      \"website\": \"https://bitcoin.org/fr/\"\n    },\n    {\n      \"_id\": \"5193bqzdiu68dbq\",\n      \"name\": \"Ethereum\",\n      \"acronym\": \"ETH\",\n      \"currentPrice\": 200,\n      \"openingPrice\": 190,\n      \"lowestPrice\": 170,\n      \"highestPrice\": 210,\n      \"supply\": 98000000,\n      \"marketCap\": 245679900,\n      \"logo\": \"https://www.ethereum-france.com/wp-content/uploads/2019/11/ETHEREUM-ICON_RGB-v3-xsmall.png\",\n      \"website\": \"https://ethereum.org/fr/\"\n    }\n  ]\n}",
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
          "content": "{\n  \"name\": \"Bitcoin\",\n  \"acronym\": \"BTC\",\n  \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n  \"website\": \"https://bitcoin.org/fr/\",\n  \"currentPrice\": 8000,\n  \"openingPrice\": 7900,\n  \"lowestPrice\": 7870,\n  \"highestPrice\": 8500,\n  \"supply\": 18000000,\n  \"marketCap\": 37800450789\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC\",\n    \"currentPrice\": 8000,\n    \"openingPrice\": 7900,\n    \"lowestPrice\": 7870,\n    \"highestPrice\": 8500,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\"\n  },\n  \"msg\": \"Crypto created successfully.\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"crypto\": {\n    \"_id\": \"567897656zqdjqld\",\n    \"name\": \"Bitcoin\",\n    \"acronym\": \"BTC2\",\n    \"currentPrice\": 80000000000,\n    \"openingPrice\": 79000000000,\n    \"lowestPrice\": 787000000000,\n    \"highestPrice\": 85000000000,\n    \"logo\": \"https://bitcoin.org/img/icons/logotop.svg?1577873163\",\n    \"website\": \"https://bitcoin.org/fr/\"\n  },\n  \"msg\": \"Crypto updated successfully.\"\n}",
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
          "content": "    HTTP/1.1 200 OK\n{\n  \"user\": {\n      \"created_at\": \"2020-01-28T12:40:23.511Z\",\n      \"email\": \"toto@yopmail.com\",\n      \"email_verified\": false,\n      \"identities\": [\n          {\n              \"user_id\": \"5e302bb72d8bd60e7a2b2f19\",\n              \"provider\": \"auth0\",\n              \"connection\": \"Username-Password-Authentication\",\n              \"isSocial\": false\n          }\n      ],\n      \"user_metadata\": {\n          \"currency\": \"USD\",\n          \"cryptos\": [],\n          \"keywords\": [\n              \"Bitcoin\",\n              \"dollar\",\n              \"Cointelegraph\"\n          ]\n      },\n      \"name\": \"toto@yopmail.com\",\n      \"nickname\": \"toto\",\n      \"picture\": \"https://s.gravatar.com/avatar/5e97dde8285093128059298e52eeeb55?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fto.png\",\n      \"updated_at\": \"2020-01-28T12:40:23.985Z\",\n      \"user_id\": \"auth0|5e302bb72d8bd60e7a2b2f19\",\n      \"username\": \"toto\",\n      \"last_ip\": \"163.5.170.74\",\n      \"last_login\": \"2020-01-28T12:40:23.985Z\",\n      \"logins_count\": 1\n  }\n}",
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
    "type": "put",
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
