const request = require('request');

var ideaGet = (context, access_token, callback) => {
    if(!access_token) return 0;
    console.log('We have a token!');

    var options = {
        url: process.env.API_URL + context,
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

var ideaPost = (context, access_token, data, callback) => {
    if(!access_token) return 0;
    console.log('We have a token!');

    var options = {
        method: 'POST',
        url: process.env.API_URL + context,
        headers: {
            'Authorization': 'Bearer ' + access_token 
        },
        body: data,
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
    ideaGet('user', access_token, callback);    
}

module.exports.postProgress = (access_token, data, callback) => {
    ideaPost('progress', access_token, data, callback);
}

module.exports.postResult = (access_token, result, callback) => {
    ideaPost('result', access_token, result, callback);
}