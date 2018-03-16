const express = require('express');
const uuidv4 = require('uuid');
const crypto = require('crypto');

const router = express.Router();

router.get('/', function(req, res) {
    let token = crypto.randomBytes(64).toString('hex');;
    req.session.state = token;
    console.log(req.session.state);

    if (req.session.access_token) {
        res.sendFile('/app/index.html', {'root': './'})
        router.use(express.static('./app'))
        
        return res.status(200);
    } else {
        console.log('Sending to Auth0 - not logged in.');
        return res.redirect(generateURL(req.session.state));
    }
});

function generateURL(state) {
    return `${process.env.AUTH_URL}/authorize?scope=openid&prompt=none&response_type=code&client_id=${
      process.env.CLIENT_ID
  }&redirect_uri=${process.env.CALLBACK_URL}&state=${state}`;
}

module.exports = router;