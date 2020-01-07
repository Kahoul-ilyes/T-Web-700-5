define({ "api": [
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
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"567897656zqdjqld\",\n  \"msg\": \"User deleted successfully.\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"_id\": \"JzmHAD68çzqdld9\",\n    \"username\": \"Toto\",\n    \"email\": \"toto@yopmail.com\",\n    \"currency\": \"EUR\",\n    \"cryptos\": [],\n    \"keywords\": []\n  }\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"users\": [\n    {\n      \"_id\": \"567897656zqdjqld\",\n      \"username\": \"Toto\",\n      \"email\": \"toto@yopmail.com\",\n      \"currency\": \"EUR\",\n      \"cryptos\": [],\n      \"keywords\": []\n    },\n    {\n      \"_id\": \"KA¨LDOASKA!çéà'\",\n      \"username\": \"Alice\",\n      \"email\": \"alice@yopmail.com\",\n      \"currency\": \"USD\",\n      \"cryptos\": [],\n      \"keywords\": []\n    }\n  ]\n}",
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
