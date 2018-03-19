const express = require('express');
const router = express.Router();

const idea = require('./idea');

router.post('/', function (req, res) {
    console.log('Post to iDEA API:', req.body)

    if(!req.body || req.body.progress === null) {
        return res.status(404).json({error: "No data."}); 
    }

    idea.postProgress(req.session.access_token, req.body, (response, body) => {

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

        if(!body) {
            console.log('Empty response from the iDEA API.');        
            return res.status(404).json({error: "No data received."});
        }

        console.log(body);
        return res.json({status: "success"});   
    }); 
})

module.exports = router;