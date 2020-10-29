const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // call api function for information on the home page
  
  res.render('index.handlebars')
})

module.exports = router;