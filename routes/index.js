const express = require('express');
const uuidv4 = require('uuid');

const router = express.Router();

router.get('/', function(req, res) {
    req.session.state = uuidv4();
    console.log(req.session.state);

    if (req.session.access_token) {
        return res.send("LOGGED IN");
    } else {
        console.log('Sending to iDEA - not logged in.');
        return res.redirect(generateURL(req.session.state));
    }
});

function generateURL(state) {
    return `${process.env.AUTH_URL}/authorize?scope=openid&prompt=none&response_type=code&client_id=${
      process.env.CLIENT_ID
  }&redirect_uri=${process.env.CALLBACK_URL}&state=${state}`;
}

module.exports = router;