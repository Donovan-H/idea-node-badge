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

        if (response.statusCode >= 400) {
            console.log(`Got a ${response.statusCode} response from the iDEA API: ${response.body.error}`)
            return res.status(response.statusCode).json({error: "Error occured.", error: response.body.error});
        }

        console.log(body);
        
        return res.json({response: response.statusCode, status: "success", data: body});   
    }); 
})

module.exports = router;