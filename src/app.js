const express = require('express')
const app = express()
const path = require('path')

app.set('views', __dirname + '/views');
// app.enable('view cache');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));
app.set('layout', 'layouts/layout')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home', {
        name: 'amir'
    }, )
    // res.send("OK, Start, Build somthing amazing")
})

module.exports = app