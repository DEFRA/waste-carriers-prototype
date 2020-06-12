const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// all routes for registration v1
router.use('/registration-v1', require('./routes_registration_v1'))


module.exports = router
