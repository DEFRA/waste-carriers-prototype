const express = require('express')
const router = express.Router()

var folder = "v1"
var servicename = "Waste carrier or broker"
var paymentMethod = "govpay"  // or "govpay"


// HTML for standard buttons
var backlink = '<a href="javascript:history.back()" class="govuk-back-link">Back</a>'
var submitButton = '<button type="submit" id="continueButton" class="govuk-button" name="Continue">Continue</button>'
//var completeLink = '<a id="completeLink" href="/'+folder+'/save-and-return/check">Continue later</a>'
var completeLink = ''

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

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
    res.render(folder+'/your-registration/new-registration',{
        "formAction":"/"+folder+"/your-registration/new-registration-check"
    })
  })

  router.post('/your-registration/new-registration', function (req, res) {
    res.render(folder+'/your-registration/new-registration',{
        "formAction":"/"+folder+"/your-registration/new-registration-check"
    })
  })
  
  // Route to check if application has started and redirect
  router.post('/your-registration/new-registration-check', function (req, res) {
  
    if (req.body['started']=="yes") {
      res.redirect("/"+folder+"/your-registration/choose-country")
    } else {
      res.redirect("/"+folder+"/your-registration/wc-number")
    }
  })

  // WCR number ==============================================================

  router.get('/your-registration/wc-number', function (req, res) {
    res.render(folder+'/your-registration/wc-number',{
        "formAction":"/"+folder+"/your-registration/choose-country"
    })
  })

  // Choose country ==============================================================

  router.get('/your-registration/choose-country', function (req, res) {
    res.render(folder+'/your-registration/choose-country',{
        "formAction":"/"+folder+"/your-registration/choose-country-check"
    })
  })

  router.post('/your-registration/choose-country', function (req, res) {
    res.render(folder+'/your-registration/choose-country',{
        "formAction":"/"+folder+"/your-registration/choose-country-check"
    })
  })
  
  // Route to check if country is England
  router.post('/your-registration/choose-country-check', function (req, res) {
  
    if (req.body['where-do-you-live']=="england") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-england")

    } if(req.body['where-do-you-live']=="scotland") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-scotland")
            
    } if(req.body['where-do-you-live']=="wales") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-wales")
   
    } if(req.body['where-do-you-live']=="northern-ireland") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-northern-ireland")
       
    } else {
      res.redirect("/"+folder+"/your-registration/you-can-only-register-in-the-uk")
    }
  })
  
module.exports = router
