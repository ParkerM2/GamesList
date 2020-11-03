const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
  let user = JSON.parse(JSON.stringify(req.user));
  console.log(req)
  res.render('index')
})
module.exports = router;