define({ "api": [
  {
    "type": "delete",
    "url": "/user/:id",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The updated user.</p>"
          }
        ]
      },
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
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>A user.</p>"
          }
        ]
      },
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
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request all users",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>An Array of users.</p>"
          }
        ]
      },
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
    "url": "/user/",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The new user.</p>"
          }
        ]
      },
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
    "url": "/user/:id",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The updated user.</p>"
          }
        ]
      },
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
    "groupTitle": "User"
  }
] });
