const express = require('express');
const router = express.Router();

const idea = require('./idea');

router.post('/', (req, res) => {
    console.log('Post result to iDEA API:', req.body)

    if(!req.body || req.body.result === null) {
        console.log('No data provided.')
        return res.status(404).json({error: "No data."}); 
    }

    idea.postResult(req.session.access_token, req.body, (response, body) => {

        if (response.statusCode === 401) {
            console.log('Got 401 response from the iDEA API with content:');
            console.log(body);
            return res.status(401).json({error: "Unauthorized request."});
        }

        if (response.statusCode === 404) {
            console.log('Got 404 response from the iDEA API.');        
            return res.status(404).json({error: "Endpoint not found."});
        }

        console.log(body);
        
        return res.json({status: "success", data: body});   
    }); 
})

module.exports = router;