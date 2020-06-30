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

  // dummy session data upper tier renew for magic link
  router.get('/magic', function (req, res) {
    req.session.data = { tier: 'upperTier',started:'no' }
    res.redirect(`/v1/your-registration/about-to-renew`)
  })

  // dummy session upper tier registration
  router.get('/upper-tier-reg', function (req, res) {
  req.session.data = { 
    started:'yes', 
    companyNumber:'CBU453565', 
    whereDoYouLive:'england', 
    tier:'upperTier',
    companyName:'My nice building company',
    companyPost:'BS1 5AH',
    compAddress:'10, GRANGE ROAD, BRISTOL',
    directorFirstname:'Sam',
    directorLastname:'Jones',
    directorDOBday:'7',
    directorDOBmonth:'10',
    directorDOByear:'1966',
    contactFirstName:'Julia',
    contactLastName:'Smith',
    contactTel:'07758333729',
    contactEmail:'admin@mynicebuilding.co.uk',
    contactPostcode:'BS1 5AH',
    contactAddress:'12, GRANGE ROAD, BRISTOL',
  }
  res.redirect(`/v1/your-registration/cya`)
})  


  // dummy session data lower tier registration
  router.get('/lower-tier-reg', function (req, res) {
    req.session.data = { 
      started:'yes', 
      companyNumber:'CBU453565', 
      whereDoYouLive:'england', 
      tier:'lowerTier',
      companyName:'My nice building company',
      companyPost:'BS1 5AH',
      compAddress:'10, GRANGE ROAD, BRISTOL',
      directorFirstname:'Sam',
      directorLastname:'Jones',
      directorDOBday:'7',
      directorDOBmonth:'10',
      directorDOByear:'1966',
      contactFirstName:'Julia',
      contactLastName:'Smith',
      contactTel:'07758333729',
      contactEmail:'admin@mynicebuilding.co.uk',
      contactPostcode:'BS1 5AH',
      contactAddress:'12, GRANGE ROAD, BRISTOL',
    }
    res.redirect(`/v1/your-registration/cya`)
  })  

    // dummy session data upper tier renewal
    router.get('/upper-tier-renewal', function (req, res) {
      req.session.data = { 
        started:'no', 
        companyNumber:'CBU453565', 
        whereDoYouLive:'england', 
        tier:'upperTier',
        companyName:'My nice building company',
        companyPost:'BS1 5AH',
        receiptEmail:'admin@mynicebuilding.co.uk',
        compAddress:'10, GRANGE ROAD, BRISTOL',
        directorFirstname:'Sam',
        directorLastname:'Jones',
        directorDOBday:'7',
        directorDOBmonth:'10',
        directorDOByear:'1966',
        contactFirstName:'Julia',
        contactLastName:'Smith',
        contactTel:'07758333729',
        contactEmail:'admin@mynicebuilding.co.uk',
        contactPostcode:'BS1 5AH',
        contactAddress:'12, GRANGE ROAD, BRISTOL',
      }
      res.redirect(`/v1/your-registration/cya`)
    })  


    // dummy session data renewal confirm
    router.get('/renewal-confirm-page', function (req, res) {
      req.session.data = { 
        started:'no', 
        companyNumber:'CBU453565', 
        whereDoYouLive:'england', 
        tier:'upperTier',
        companyName:'My nice building company',
        companyPost:'BS1 5AH',
        compAddress:'10, GRANGE ROAD, BRISTOL',
        directorFirstname:'Sam',
        directorLastname:'Jones',
        directorDOBday:'7',
        directorDOBmonth:'10',
        directorDOByear:'1966',
        contactFirstName:'Julia',
        contactLastName:'Smith',
        contactTel:'07758333729',
        contactEmail:'admin@mynicebuilding.co.uk',
        contactPostcode:'BS1 5AH',
        contactAddress:'12, GRANGE ROAD, BRISTOL',
      }
      res.redirect(`/v1/your-registration/done/worldpay-confirm`)
    })  


    // dummy session data renewal confirm
    router.get('/renewal-choose-payment', function (req, res) {
      req.session.data = { 
        started:'no', 
        companyNumber:'CBU453565', 
        whereDoYouLive:'england', 
        tier:'upperTier',
        companyName:'My nice building company',
        companyPost:'BS1 5AH',
        compAddress:'10, GRANGE ROAD, BRISTOL',
        directorFirstname:'Sam',
        directorLastname:'Jones',
        directorDOBday:'7',
        directorDOBmonth:'10',
        directorDOByear:'1966',
        contactFirstName:'Julia',
        contactLastName:'Smith',
        contactTel:'07758333729',
        contactEmail:'admin@mynicebuilding.co.uk',
        contactPostcode:'BS1 5AH',
        contactAddress:'12, GRANGE ROAD, BRISTOL',
      }
      res.redirect(`/v1/your-registration/pay/choose-payment`)
    })  
module.exports = router