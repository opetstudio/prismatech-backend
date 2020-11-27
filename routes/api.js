var express = require('express')
var router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('config')
const formidable = require('formidable')
const Moment = require('moment')
const Apisauce = require('apisauce')
router.all('/v1/callback-nicepay', async function (req, res, next) {
  try {
    console.log('callback invoked')
    console.log('req.body==>', req.body)
    res.json({ status: 200, error: '' })
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
})
module.exports = router
