const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    res.locals.hostname=process.env.THISHOST
    next()
  });

// Add your routes here - above the module.exports line
// all routes for registration v1
router.use('/v1', require('./routes_registration_v1'))

// Route index page
router.get('/', function (req, res) {
    res.render('index')
  })

  // set up redirect for letter testing
  router.get('/renew/bluefishbox', function (req, res) {
    req.session.data = { permitoperation: 'mcp' }
    res.redirect(`/v1/your-registration/about-to-renew`)
  })

  // set up redirect for letter testing
    router.get('/renew/782gkd57bdjs84hf', function (req, res) {
    req.session.data = { permitoperation: 'mcp' }
    res.redirect(`/v1/your-registration/about-to-renew`)
  })
module.exports = router