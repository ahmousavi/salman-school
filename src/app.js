const express = require('express')
const app = express()
const path = require('path')

app.set('views', __dirname + '/views');
// app.enable('view cache');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));
app.set('layout', 'layouts/layout')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', require('./routers/user.router'))

module.exports = app