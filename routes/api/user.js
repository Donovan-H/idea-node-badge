const express = require('express');
const router = express.Router();

const idea = require('./idea');

router.get('/', function (req, res) {
    console.log('Requesting iDEA API...')

    idea.getUser(req.session.access_token, (response, body) => {

        if (response.statusCode === 401) {
            console.log('Got 401 response from the iDEA API with content:');
            console.log(body);
            // Redirect to login endpoint in case access token
            // is rejected.
            return res.status(401).json({error: "Unauthorized request."});
        }

        if (response.statusCode === 404) {
            console.log('Got 404 response from the iDEA API.');        
            return res.status(404).json({error: "Endpoint not found."});
        }

        console.log(body);
        
        res.json(body);
    });
})

module.exports = router;