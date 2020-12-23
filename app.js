var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var connect = require('connect')
var serveStatic = require('serve-static')
var vhost = require('vhost')

const mongoose = require('mongoose')
const cors = require('cors')
const corsAccess = require('./middlewares/corsAccess')
// const config = require('config')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session)


function run ({ middleware, sdkSubdomain, adminSubdomain, apiSubdomain, dirname, routes, graphql: { middleware: externalMiddleware, query: externalQuery, mutation: externalMutation, routePath: graphqlRoutePath }, config, port: applicationPort, hostname }) {
  console.log('run prismatech backend')

  // var mainapp = connect()

  // create app that will server user content from public/{username}/
  

  console.log('trying to connect to db... ', config.get('mongoUrl'))
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  mongoose.connect(config.get('mongoUrl'), mongoOptions)
    .then((res) => console.log('Connected to MongoDB... ', config.get('mongoUrl')))
    .catch((err) => console.log('Cannot connect to MongoDB...', err))

  // var apiRouter = routes.apiRouter
  // var apiRouter = require('./routes/api')
  // var indexRouter = routes.indexRouter
  // var usersRouter = require('./routes/users')
  // var adminRouter = require('./routes/admin')
  const port = process.env.PORT || applicationPort || 3000
  var app = express()
  app.io = require('socket.io')()
  const server = require('http').createServer(app)
  server.listen(port, () => {
    console.log(`Running on localhost ${port}`)
  })
  app.io.attach(server)
  var sess = {
    secret: 'keyboard cat',
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      resave: false
    },
    store: new MongoStore({
      url: config.get('mongoUrl'),
      mongoOptions,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
  }
  console.log('env======>', app.get('env'))
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  console.log('session config====>', sess)
  app.use(session(sess))
  // view engine setup
  app.set('views', path.join(dirname || __dirname, 'views'))
  app.use(express.static(path.join(dirname || __dirname, 'public')))
  app.use(express.static(path.join(dirname || __dirname, 'template')))
  // app.enable('trust proxy')

  // app.set('view engine', 'pug')
  // app.set('views', path.join(__dirname, 'views'))
  // app.set('view engine', 'jade')
  // app.set('view engine', 'pug')

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(cors({ exposedHeaders: 'Authorization' }))

  // API APPLICATION
  var apiApp = express()
  const graphqlRouter = require('./routes/graphql')({ io: app.io, externalQuery, externalMutation, externalMiddleware })
  app.use(graphqlRoutePath, graphqlRouter)
  app.use('/core/api', require('./routes/api'))

  // app.use(corsAccess())

  // ADMIN APPLICATION
  var adminApp = express()
  adminApp.engine('html', require('ejs').renderFile)
  adminApp.set('view engine', 'html')
  // app.use('/users', usersRouter)
  // routes.forEach((v, i) => {
  //   adminApp.use(v.path, v.route)
  // })

  // SDK
  // var sdkApp = express()
  // sdkApp.engine('html', require('ejs').renderFile)
  // sdkApp.set('view engine', 'html')
  // app.use('/users', usersRouter)

  apiApp.use(function (req, res, next) {
    // var username = req.vhost[0] // username is the "*"
    // console.log('apiApp v.path=====>')
    // console.log('apiApp req.url=====>' + req.url)
    // console.log('apiApp req.originalUrl=====>' + req.originalUrl)
    // pretend request was for /{username}/* for file serving
    // req.originalUrl = req.url
    // req.url = '/api' + req.url
    next()
  })

  // INDEX APPLICATION
  // var indexApp = express()
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  // app.use('/users', usersRouter)

  app.use(middleware)
  routes.forEach((v, i) => {
    console.log('urutan route ' + v.path)
    app.use(v.path, v.route)
  })

  // for (let i = 0; i < routes.length; i++) {
  //   const v = routes[i]
  //   if (v.appType === 'sdk') {
  //     sdkApp.use(function (req, res, next) {
  //       var username = req.vhost[0] // username is the "*"
  //       console.log('sdkApp=====>', username)
  //       // pretend request was for /{username}/* for file serving
  //       req.originalUrl = req.url
  //       req.url = v.path + req.url
  //       next()
  //     })
  //     sdkApp.use(v.path, v.route)
  //   }
  //   if (v.appType === 'api') {
  //     apiApp.use(v.path, v.route)
  //   }
  //   if (v.appType === 'admin') {
  //     adminApp.use(function (req, res, next) {
  //       var username = req.vhost[0] // username is the "*"
  //       console.log('adminApp=====>', username)
  //       // pretend request was for /{username}/* for file serving
  //       req.originalUrl = req.url
  //       req.url = v.path + req.url
  //       next()
  //     })
  //     adminApp.use(v.path, v.route)
  //   }
  //   if (v.appType === 'index') {
  //     indexApp.use(function (req, res, next) {
  //       var username = req.vhost[0] // username is the "*"
  //       console.log('indexApp=====>', username)
  //       // pretend request was for /{username}/* for file serving
  //       // req.originalUrl = req.url
  //       // req.url = v.path + req.url
  //       next()
  //     })
  //     indexApp.use(v.path, v.route)
  //   }
  // }

  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404))
  // })

  // error handler
  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message
  //   res.locals.error = req.app.get('env') === 'development' ? err : {}

  //   // render the error page
  //   res.status(err.status || 500)
  //   res.render('error')
  // })
  // app.use(vhost('siapdev.opetstudio.com', mainapp))
  // app.use(vhost(sdkSubdomain + '.' + hostname, sdkApp))
  // app.use(vhost(apiSubdomain + '.' + hostname, apiApp))
  // app.use(vhost(adminSubdomain + '.' + hostname, adminApp))
  // app.use(vhost(hostname, indexApp))
  // app.use(vhost('*.' + hostname, indexApp))
  // app.use(vhost('store.rayapaydev.id', indexApp))
  // app.use(vhost('user.tokoinstandev.com', userapp))
  // app.use(vhost('api.tokoinstandev.com', userapp))
  // app.use(vhost('*.tokoinstandev.com', userapp))

  return app
}

module.exports = run
