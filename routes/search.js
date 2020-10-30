  
const express = require('express')
const router = express.Router()
router.get('/search', (req, res) => {

  res.render('search.handlebars')
})
module.exports = router;