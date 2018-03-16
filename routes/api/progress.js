const express = require('express');
const router = express.Router();

const idea = require('./idea');

router.post('/', function (req, res) {
    console.log('Post to iDEA API...', req)

})
    
module.exports = router;