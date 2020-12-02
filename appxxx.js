var connect = require('connect')
var serveStatic = require('serve-static')
var vhost = require('vhost')

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')


const mongoose = require('mongoose')
const cors = require('cors')
const corsAccess = require('./middlewares/corsAccess')
// const config = require('config')
var session = require('express-session')

function run ({ dirname, routes, graphql: { query: externalQuery, mutation: externalMutation, routePath: graphqlRoutePath }, config, port: applicationPort }) {
  var app = express()
  // create main app
  // var app = connect()

  app.io = require('socket.io')()
  const server = require('http').createServer(app)
  const port = process.env.PORT || applicationPort || 3000
  server.listen(port, () => {
    console.log(`Running on localhost ${port}`)
  })
  app.io.attach(server)
  console.log('trying to connect to db... ', config.get('mongoUrl'))
  mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((res) => console.log('Connected to MongoDB... ', config.get('mongoUrl')))
    .catch((err) => console.log('Cannot connect to MongoDB...', err))

  const graphqlRouter = require('./routes/graphql')({ io: app.io, externalQuery, externalMutation })
  // var mainapp = connect()

  // add middlewares to mainapp for the main web site

  // create app that will server user content from public/{username}/
  var userapp = express()

  userapp.use(function (req, res, next) {
    var username = req.vhost[0] // username is the "*"
    console.log('req.vhost===>', req.vhost)
    console.log('username===>', username)

    // pretend request was for /{username}/* for file serving
    // req.originalUrl = req.url
    // req.url = '/' + username + req.url
    // req.url = '/' + username + req.url

    next()
  })
  // userapp.use(serveStatic('public'))

  var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  userapp.use(session(sess))

  userapp.set('views', path.join(dirname || __dirname, 'views'))
  userapp.engine('html', require('ejs').renderFile)
  userapp.set('view engine', 'html')

  userapp.use(logger('dev'))
  userapp.use(express.json())
  userapp.use(express.urlencoded({ extended: false }))
  userapp.use(cookieParser())
  userapp.use(express.static(path.join(dirname || __dirname, 'public')))
  userapp.use(cors({ exposedHeaders: 'Authorization' }))
  userapp.use(graphqlRoutePath, graphqlRouter)
  userapp.use('/core/api', require('./routes/api'))
  routes.forEach((v, i) => {
    userapp.use(v.path, v.route)
  })

  // add vhost routing for main app
  // app.use(vhost('userpages.local', mainapp))
  // app.use(vhost('www.userpages.local', mainapp))

  // listen on all subdomains for user pages
  app.use(vhost('*.opetstudio.com', userapp))

  // app.listen(8080)

  return app
}

module.exports = run
