const express = require('express')
const router = express.Router()

var folder = "v1"
var servicename = "Register as a waste carrier"
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
  
  // Route to check if new application has started or is a renewal
  router.post('/your-registration/new-registration-check', function (req, res) {
  
    if (req.body['started']=="yes") {
      res.redirect("/"+folder+"/your-registration/choose-country")
    } else {
      res.redirect("/"+folder+"/your-registration/wc-number")
    }
  })

  // Choose payment ==============================================================

  router.get('/your-registration/pay/choose-payment', function (req, res) {
    res.render(folder+'/your-registration/pay/choose-payment',{
        "formAction":"/"+folder+"/your-registration/pay/choose-payment-check"
    })
  })

  router.post('/your-registration/pay/choose-payment', function (req, res) {
    res.render(folder+'/your-registration/pay/choose-payment',{
        "formAction":"/"+folder+"/your-registration/pay/choose-payment-check"
    })
  })
  
  // Route to check if payment is bacs or card
  router.post('/your-registration/pay/choose-payment-check', function (req, res) {
  
    if (req.body['choose-payment']=="bacs") {
      res.redirect("/"+folder+"/your-registration/pay/bacs-confirm")
    } else {
      res.redirect("/"+folder+"/your-registration/done/worldpay-confirm")
    }
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
        res.redirect("/"+folder+"/your-registration/registration-holder")

    } if(req.body['where-do-you-live']=="scotland") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-scotland")
            
    } if(req.body['where-do-you-live']=="wales") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-wales")
   
    } if(req.body['where-do-you-live']=="northern-ireland") {
        res.redirect("/"+folder+"/your-registration/you-can-register-in-northern-ireland")
       
    } else {
      res.redirect("/"+folder+"/your-registration/registration-holder")
    }
  })
 
  

  // Choose registration type ==============================================================

 // router.get('your-registration/registration-holder', function (req, res) {
 //   res.render(folder+'/your-registration/registration-holder',{
 //       "formAction":"/"+folder+"/your-registration/registration-holder-check"
 //   })
 // })

 // router.post('/your-registration/registration-holder', function (req, res) {
 //   res.render(folder+'/your-registration/registration-holder',{
 //       "formAction":"/"+folder+"/your-registration/registration-holder-check"
 //   })
 // })
  
  // Route to check if country is England
  // router.post('/your-registration/registration-holder-check', function (req, res) {
  
  //  if (req.body['registration-holder']=="charity-trust") {
  //      res.redirect("/"+folder+"/your-registration/registration-type")

  //  } if(req.body['registration-holder']=="la-public-body") {
  //      res.redirect("/"+folder+"/your-registration/registration-type")
            
  //  } if(req.body['registration-holder']=="llp") {
  //      res.redirect("/"+folder+"/your-registration/registration-type")
   
  //  } if(req.body['registration-holder']=="partnership") {
  //      res.redirect("/"+folder+"/your-registration/registration-type")
      
  //  } if(req.body['registration-holder']=="ltd-comp") {
  //      res.redirect("/"+folder+"/your-registration/registration-type")
      
  //  } else {
  //    res.redirect("/"+folder+"/your-registration/registration-type")
  //  }
 // })

 // Registration holder form action based on registration/renew status ==============================================================

 
  router.get('/your-registration/registration-holder', function (req, res) {
   if( req.session.data['started']=="yes" ){ // yes it's a new registration
   res.render(folder+'/your-registration/registration-holder',{
         "formAction":"/"+ folder + "/your-registration/registration-type"
       })
   } else {
    res.render(folder+'/your-registration/registration-holder',{
      "formAction":"/"+ folder + "/your-registration/do-you-carry-waste"
       })
   }
 })

  // Do you carry waste form action based on registration/renew status ==============================================================

 
  router.get('/your-registration/do-you-carry-waste', function (req, res) {
    if( req.session.data['started']=="yes" ){ // yes it's a new registration
    res.render(folder+'/your-registration/do-you-carry-waste',{
          "formAction":"/"+ folder + "/your-registration/comp-no"
        })
    } else {
     res.render(folder+'/your-registration/do-you-carry-waste',{
       "formAction":"/"+ folder + "/your-registration/confirm-renewal-details"
        })
    }
  })

    // WCR number form action based on registration/renew status ==============================================================

    router.get('/your-registration/wc-number', function (req, res) {
      if( req.session.data['started']=="yes" ){ // yes it's a new registration
      res.render(folder+'/your-registration/wc-number',{
        "formAction":"/"+folder+"/your-registration/choose-country"
      })
    } else {
      res.render(folder+'/your-registration/wc-number',{
        "formAction":"/"+folder+"/your-registration/about-to-renew"
    })
  }
})


    // Registration type form action based on tier status ==============================================================

    router.get('/your-registration/registration-type', function (req, res) {
      res.render(folder+'/your-registration/registration-type',{
        "formAction":"/"+folder+"/your-registration/registration-type-check"
    })
  })

  router.post('/your-registration/registration-type', function (req, res) {
    res.render(folder+'/your-registration/registration-type',{
        "formAction":"/"+folder+"/your-registration/registration-type-check"
    })
  })
  
  // Route to check if payment is bacs or card
  router.post('/your-registration/registration-type-check', function (req, res) {
  
    if (req.body['tier']=="help-decide-tier") {
      res.redirect("/"+folder+"/your-registration/registration-type")
    } else {
      res.redirect("/"+folder+"/your-registration/register-tier-details")
    }
  })

// Convictions routing based on yes/no


router.get('/your-registration/convictions', function (req, res) {
  res.render(folder+'/your-registration/convictions',{
    "formAction":"/"+folder+"/your-registration/convictions-check"
})
})

router.post('/your-registration/convictions', function (req, res) {
res.render(folder+'/your-registration/convictions',{
    "formAction":"/"+folder+"/your-registration/convictions-check"
})
})

// Route to check if payment is bacs or card
router.post('/your-registration/convictions-check', function (req, res) {

if (req.body['convictions']=="yes") {
  res.redirect("/"+folder+"/your-registration/conviction-details")
} else {
  res.redirect("/"+folder+"/your-registration/reg-contact")
}
})

  
// set up dummy data
router.get('/test', function (req, res) {
  req.session.data = { permitoperation: 'mcp-standard' }
  res.redirect(`/${folder}/your-registration/do-you-carry-waste`)
})

module.exports = router
