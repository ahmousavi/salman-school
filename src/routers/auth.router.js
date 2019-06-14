const router = require('express').Router();
const User = require('./../models/user.model')
const bcrypt = require('bcrypt')
const { SECRET_KEY } = require('./../config')


function checkToken(req, res, next) {
    let token = req.cookies['sch-token'] || null
    if (token) {
        User.findOne({ token: token }, (err, user) => {
            if (err) {
                console.log('Error', err);
                res.render('error', { error: err })
            }
            else if (user) {
                req.user = user
                next();
            }
            else {
                res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
                res.end();
            }
        })
    }
    else {
        res.render('login')
    }
}

router.get('/login', function (req, res) {
    let token = req.cookies['sch-token'] || null
    if (token) {
        User.findOne({ token: token }, (err, user) => {
            if (err) {
                console.log('Error', err);
                res.render('error', { error: err })
            }
            else if (user) {
                req.user = user
                res.render('/panel')
            }
            else {
                res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
                res.render('login')
            }
        })
    }
    else {
        res.render('login')
    }
})

router.post('/login', function (req, res) {
    const { natcode, password } = req.body;

    User.findOne({ national_code: natcode }, (err, user) => {
        if (err) {
            res.render('error', { error: err })
        }
        if (user) {           
            user.checkPassword(password, (err, ismatch) => {
                if (err) {
                    console.log(err.message)
                } 
                else if (ismatch) {
                    const token = bcrypt.hashSync(natcode + SECRET_KEY, 10)
                    user.token = token
                    user.save().catch(err => console.log("Set token", err))
                    res.cookie('sch-token', token, { maxAge: 900000, httpOnly: true })
                    if (user.user_type === 'Student') {
                        res.redirect('/student/panel')
                    }
                    else if (user.user_type === 'Admin') {
                        res.redirect('/admin')
                    }
                }
                else {
                    res.render('login', {error: {message: 'wrong password'}})
                }
            })
        }
        else {
            res.render('login', {error: {message: 'user not found'}})
        }
    })

})

router.post('/logout', function (req, res) {
    let token = req.cookies['sch-token'] || null
    if (token) {
        res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
        res.send('logged out')
    }
    else {
        res.render('login')
    }
})


module.exports = router