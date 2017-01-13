# ![Node/Express/Mongoose App]

>
# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an excpetion at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API. They contain
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Cloud Deployment using Cloud Foundry CLI

Please follow this link https://console.ng.bluemix.net/docs/starters/install_cli.html for deployment using Cloud FOundry CLI.
IBM bluemix provides nodejs runtime, follow this link for more information https://console.ng.bluemix.net/docs/runtimes/nodejs/index.html#nodejs_runtime 

Bluemix Dashboard after service deployment 
# !(dashboard.png)



## Error Handling

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand]

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.


Authentication Header:

Authorization: Token jwt.token.here

JSON Objects returned by API:

Users (for authentication)

{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
Profile

{
  "profile": {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": false
  }
}
Single Article

{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
Multiple Articles

{
  "articles":[{
    "description": "Ever wonder how?",
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }, {
    "description": "So toothless",
    "slug": "how-to-train-your-dragon-2",
    "title": "How to train your dragon 2",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }],
  "articlesCount": 2
}
Single comment

{
  "comment": {
    "id": 1,
    "body": "It takes a Jacobian",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
Multiple comments

{
  "comments": [{
    "id": 1,
    "body": "It takes a Jacobian",
    "createdAt": "2016-02-18T03:22:56.637Z",
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }]
}
List of Tags

{
  "tags": [
    "reactjs",
    "angularjs"
  ]
}
Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

Endpoints:

Authentication:

POST /api/users/login

Example request body:

{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
No authentication required, returns a User

Required fields: email, password

Registration:

POST /api/users

Example request body:

{
  "user":{
    "username": "Jacob"
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
No authentication required, returns a User

Required fields: email, username, password

Get Current User

GET /api/user

Authentication required, returns a User that's the current user

Update User

PUT /api/user

Example request body:

{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
Authentication required, returns the User

Accepted fields: email, username, password, image, bio

Get Profile

GET /api/profiles/:username

Authentication optional, returns a Profile

Follow user

POST /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

Unfollow user

DELETE /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

List Articles

GET /api/articles

Returns most recent articles globally be default, provide tag, author or favorited query parameter to filter results

Query Parameters:

Filter by tag:

?tag=AngularJS

Filter by author:

?author=jake

Favorited by user:

?favorited=jake

Limit number of articles (default is 20):

?limit=20

Offset/skip number of articles:

?offset=0

Authentication optional, will return multiple articles, ordered by most recent first

Feed articles

GET /api/articles/feed

Can also take limit and offset query parameters like List Articles

Authentication required, will return multiple articles created by followed users, ordered by most recent first.

Retrieve Article

GET /api/articles/:slug

No authentication required, will return single article

Create Article

POST /api/articles

Example request body:

{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ['reactjs', 'angularjs', 'dragons']
  }
}
Authentication required, will return an Article

Required fields: title, description, body

Optional fields: tagList as an array of Strings

Update article

PUT /api/articles/:slug

Example request body:

{
  "article": {
    "title": "Did you train your dragon?"
  }
}
Authentication required, returns the updated Article

Optional fields: title, description, body

The slug also gets updated when the title is changed

Adding comments to an article

POST /api/articles/:slug/comments

Example request body:

{
  "comment": {
    "body": "His name was my name too."
  }
}
Authentication required, returns the created Comment

Required fields: body

Getting comments to an article

GET /api/articles/:slug/comments

Authentication optional, returns multiple comments

Deleting a comment

DELETE /api/articles/:slug/comments/:id

Authentication required

Favoriting an article

POST /api/articles/:slug/favorite

Authentication required, returns the Article

No additional parameters required

Unfavoriting an article

DELETE /api/articles/:slug/favorite

Authentication required, returns the Article

No additional parameters required
