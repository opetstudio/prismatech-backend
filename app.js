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
  app.io = require('socket.io')()

  const server = require('http').createServer(app)

  app.io.attach(server)
  console.log('trying to connect to db... ', config.get('mongoUrl'))
  mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((res) => console.log('Connected to MongoDB... ', config.get('mongoUrl')))
    .catch((err) => console.log('Cannot connect to MongoDB...', err))

  // var apiRouter = routes.apiRouter
  // var apiRouter = require('./routes/api')
  // var indexRouter = routes.indexRouter
  // var usersRouter = require('./routes/users')
  // var adminRouter = require('./routes/admin')
  const graphqlRouter = require('./routes/graphql')({ io: app.io, externalQuery, externalMutation })

  const port = process.env.PORT || applicationPort || 3000

  server.listen(port, () => {
    console.log(`Running on localhost ${port}`)
  })

  const corsOptions = {
    exposedHeaders: 'Authorization'
  }

  var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  app.use(session(sess))

  // view engine setup
  // view engine setup
  app.set('views', path.join(dirname || __dirname, 'views'))
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  // app.set('view engine', 'pug')
  // app.set('views', path.join(__dirname, 'views'))
  // app.set('view engine', 'jade')
  // app.set('view engine', 'pug')

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(dirname || __dirname, 'public')))
  app.use(cors(corsOptions))

  // app.use(corsAccess())

  // app.use('/users', usersRouter)
  app.use(graphqlRoutePath, graphqlRouter)
  app.use('/core/api', require('./routes/api'))
  routes.forEach((v, i) => {
    app.use(v.path, v.route)
  })

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })
  return app
}

module.exports = run
