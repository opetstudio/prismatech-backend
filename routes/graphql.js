const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema')
const config = require('config')
const { applyMiddleware } = require('graphql-middleware')

// bheem
const authorizationMiddlewares = require('../middlewares/authorization')

// lms
const authMiddleware = require('../middlewares/auth')
const accessTokenValidateMiddleware = require('../middlewares/accessTokenFilter')
const privilegeValidateMiddleware = require('../middlewares/authorizationFilter')
const contentUrlDecode = require('../middlewares/contentUrlDecode')

// const meeting = require('../src/socket/meeting')

module.exports = function ({ io, externalQuery, externalMutation, externalMiddleware }) {
  // meeting(io)

  const Router = express.Router()
  const sc = schema({ externalQuery, externalMutation })

  const mw = [
    authorizationMiddlewares, authMiddleware, accessTokenValidateMiddleware, privilegeValidateMiddleware, contentUrlDecode, ...externalMiddleware
  ]

  applyMiddleware(sc, ...mw)

  return Router.all('/', [(req, res, next) => {
    console.log('halowwwwxxxx')
    if (req.method === 'POST') {
      // do form handling
      // if(req.body.files)
    }
    next()
  }], (req, res) => {
    return graphqlHTTP({
      schema: sc,
      graphiql: config.get('isGraphiqlActive'),
      context: { req, res }
    })(req, res)
  })
}
