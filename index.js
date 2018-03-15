require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = new express;

const index = require('./routes')
const callback = require('./routes/callback')
const logout = require('./routes/logout')

app.listen(process.env.PORT, () => console.log('listening on ', process.env.PORT));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/callback', callback);
app.use('/logout', logout);

app.get('/api/test', function (req, res) {
  let token = req.session.access_token;
  res.json({access_token: token})
})

