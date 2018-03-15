require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = new express;

const index = require('./routes')
const callback = require('./routes/callback')
const logout = require('./routes/logout')
const idea = require('./routes/idea');

app.listen(process.env.PORT, () => console.log('listening on ', process.env.PORT));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/callback', callback);
app.use('/logout', logout);

app.get('/api/progress', function (req, res) {
  let token = req.session.access_token;
  if(req.session.access_token) {
    
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
    

  } else {
    console.log('Unauthorized request.')
    res.status(401).json({error: "Unauthorized request."})
  }
})

