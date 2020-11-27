const nicepay = require('../../../src/services/pg_integration/nicepay')

const body = { pgBaseUrl: '', payload: { userId: '' } }
nicepay.registration(body)
