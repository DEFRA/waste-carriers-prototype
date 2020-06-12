const express = require('express')
const router = express.Router()

var folder = "registration-v1"

// HTML for standard buttons
var backlink = '<a href="javascript:history.back()" class="govuk-back-link">Back</a>'

router.use(function (req, res, next) {
    // set a folder and store in locals
    // this can then be used in pages as {{folder}}
    res.locals.folder=folder
    res.locals.backlink=backlink
    res.locals.submitButton=submitButton
    res.locals.completeLink=completeLink
    res.locals.paymentMethod=paymentMethod
    res.locals.serviceName=servicename
    // permit and autostore data set in all statement at bottom
    res.locals.permit=res.locals.data
  
    next()
  });

  // New registration ==============================================================

router.get('/your-registration/new-registration', function (req, res) {
    res.render(folder + '/your-registration/new-registration',{
        "formAction":"/"+ folder + "/save-and-return/save-choice"
    })
  })

  router.post('/your-registration/new-registration', function (req, res) {
    res.render(folder + '/your-registration/new-registration',{
        "formAction":"/"+ folder + "/save-and-return/save-choice"
    })
  })
  
  // Route to check if application has started and redirect
  router.post('/save-and-return/save-choice', function (req, res) {
    if (req.body['started-application']=="no") {
      res.redirect("/"+ folder + "/wcr-magic-link/choose-country")
    } else {
      res.redirect("/"+ folder + "/save-and-return/already-started")
    }
  })
module.exports = router
