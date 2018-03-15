const request = require('request');

const ideaURL = 'https://idea.org.uk/api/'

var ideaRequest = (context, access_token, callback) => {
    if(!access_token) return 0;
    console.log('We have a token!');

    var options = {
        url: ideaURL + context,
        headers: {
            'Authorization': 'Bearer ' + access_token 
        },
        json: true
    };

    request(options, (err, res, body) => {
        if(!err && res.statusCode === 200) {
            callback(res, body);
        } else {
            callback(res, null);
        }
    });
}

module.exports.getUser = (access_token, callback) => {
    ideaRequest('user', access_token, callback);    
}