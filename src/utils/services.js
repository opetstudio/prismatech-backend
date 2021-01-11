const randomstring = require('randomstring')
const nodemailer = require('nodemailer')
const config = require('config')
var querystring = require('querystring')
var http = require('http')

const generateRandomString = async (length) => {
  return randomstring.generate({
    length,
    charset: 'alphabetic'
  })
}

const generateRandomNumber = async (length) => {
  return randomstring.generate({
    length,
    charset: 'numeric'
  })
}

const generateId = async () => {
  const randomStr = await generateRandomString(5)
  const id = new Date().getTime() + randomStr
  return id
}

const sendMail = async model => {
  var mailOptions

  var smtpConfig = {
    host: config.get('smtpHost'),
    port: config.get('smtpPort'),
    secure: true, // use SSL
    auth: {
      user: config.get('smtpEmail'),
      pass: config.get('smtpPass')
    }
  }

  const transporter = nodemailer.createTransport(smtpConfig)

  if (model.type === 'signup') {
    mailOptions = {
      from: config.get('smtpEmail'),
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for applying to Tokoonline. We are looking forward for your action in changing your name and password.
            name: ${model.username}
            password: ${model.password}`
    }
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    throw new Error(err)
  }
}
function flatten (arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

function PostCode (codestring) {
  // Build the post string from an object
  var postData = querystring.stringify({
    compilation_level: 'true',
    // compilation_level: 'ADVANCED_OPTIMIZATIONS',
    output_format: 'json',
    output_info: 'compiled_code',
    warning_level: 'QUIET',
    js_code: codestring
  })

  // An object of options to indicate where to post to
  var postOptions = {
    host: 'localhost',
    port: '8283',
    path: '/generatetransaction',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  // Set up the request
  var postReq = http.request(postOptions, function (res) {
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk)
    })
    res.on('error', function (err) {
      console.log('Response error: ' + err)
    })
  })

  // post the data
  postReq.write(postData)
  postReq.end()
}

module.exports = {
  generateRandomString,
  generateRandomNumber,
  generateId,
  sendMail,
  flatten,
  PostCode
}
