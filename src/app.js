const express = require('express')
const app = express()
const path = require('path')

app.set('views', __dirname + '/views');
// app.enable('view cache');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));
app.set('layout', 'layouts/layout')


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routers/auth.router'))
app.use('/user', require('./routers/user.router'))

app.get('/test', (req, res) => {
    res.send({cookies: req.cookies || "No"})
})
app.get('/set', (req, res) => {
    res.cookie('username', 'john doe', { maxAge: 60000, httpOnly: true });
    res.send("Set")
})


module.exports = app