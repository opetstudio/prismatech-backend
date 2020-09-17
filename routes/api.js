var express = require('express')
var router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('config')
const formidable = require('formidable')
const FileModel = require('../src/collections/file/Model')
const TokoTokoOnlineModel = require('../src/collections/toko_toko_online/Model')
const pathmodule = require('path')
const TokoProductService = require('../src/collections/toko_product/services')
const TokoCartService = require('../src/collections/toko_cart/services')
const TokoPoService = require('../src/collections/toko_po/services')
const Moment = require('moment')
const Apisauce = require('apisauce')

/* GET home page. */
router.get('/v1/fetchdata-province', async function (req, res, next) {
  console.log('okeeeee sip fetchdata-province')
  const api = Apisauce.create({
    baseURL: config.get('rajaongkirBackendBaseUrl'),
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // xsrfCookieName: 'myCatx',
      // timeout: 10000,
      key: 'a6d84c88b9fc6cbdf502972c57885da1'
    }
  })
  const resp = await api.get('/plink/v1/province')
  // console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  // console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  // console.log('resp.data====>', resp.data)
  // console.log('bodyHit====>', bodyHit)
  // console.log('resp====>', resp)
  if (!resp.ok) throw new Error('' + resp.problem)
  res.json(resp.data)
})
router.get('/v1/fetchdata-city', async function (req, res, next) {
  const api = Apisauce.create({
    baseURL: config.get('rajaongkirBackendBaseUrl'),
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // xsrfCookieName: 'myCatx',
      // timeout: 10000,
      key: 'a6d84c88b9fc6cbdf502972c57885da1'
    }
  })
  const resp = await api.get('/plink/v1/city?province=' + req.query.province)
  // console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  // console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  // console.log('resp.data====>', resp.data)
  // console.log('bodyHit====>', bodyHit)
  // console.log('resp====>', resp)
  if (!resp.ok) throw new Error('' + resp.problem)
  res.json(resp.data)
})
router.get('/v1/fetchdata-subcity', async function (req, res, next) {
  const api = Apisauce.create({
    baseURL: config.get('rajaongkirBackendBaseUrl'),
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // xsrfCookieName: 'myCatx',
      // timeout: 10000,
      key: 'a6d84c88b9fc6cbdf502972c57885da1'
    }
  })
  const resp = await api.get('/plink/v1/subcity?city=' + req.query.city)
  // console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  // console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  // console.log('resp.data====>', resp.data)
  // console.log('bodyHit====>', bodyHit)
  // console.log('resp====>', resp)
  if (!resp.ok) throw new Error('' + resp.problem)
  res.json(resp.data)
})
router.post('/v1/fetchdata-cost', async function (req, res, next) {
  const bodyHit = {
    origin: req.body.origin,
    originType: req.body.originType,
    destinationType: req.body.destinationType,
    destination: req.body.destination,
    weight: req.body.weight,
    courier: req.body.courier
  }
  const api = Apisauce.create({
    baseURL: config.get('rajaongkirBackendBaseUrl'),
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // xsrfCookieName: 'myCatx',
      // timeout: 10000,
      key: 'a6d84c88b9fc6cbdf502972c57885da1'
    }
  })
  const resp = await api.post('/plink/v1/cost', bodyHit)
  // console.log('resp.duration====>', resp.duration)
  console.log('resp.problem====>', resp.problem)
  // console.log('resp.status====>', resp.status)
  console.log('resp.ok====>', resp.ok)
  // console.log('resp.data====>', resp.data)
  // console.log('bodyHit====>', bodyHit)
  // console.log('resp====>', resp)
  if (!resp.ok) throw new Error('' + resp.problem)
  res.json(resp.data)
})

module.exports = router
