const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    res.locals.hostname=process.env.THISHOST
    next()
  });

// Add your routes here - above the module.exports line
// all routes for registration v1
router.use('/v1', require('./routes_registration_v1'))
router.use('/v2', require('./routes_registration_v2'))

// Route index page
router.get('/', function (req, res) {
    res.render('index')
  })




module.exports = router