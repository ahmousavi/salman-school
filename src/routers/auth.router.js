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
        res.render('login', {'layout': ''})
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
                if (user.user_type === 'Student') {
                    res.render('panel_stu', {user: user})
                }
                else if (user.user_type === 'Employee') {
                    res.render('panel_emp', {user: user})
                }
            }
            else {
                res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
                res.render('login', {'layout': ''})
            }
        })
    }
    else {
        res.render('login', {'layout': ''})
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
                    res.cookie('sch-token', token, { maxAge: 2*60*60*1000, httpOnly: true })
                    if (user.user_type === 'Student') {
                        res.redirect('/panel')
                    }
                    else if (user.user_type === 'Employee') {
                        res.redirect('/panel')
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

router.get('/logout', checkToken, function (req, res) {
    res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
    res.send('logged out')
})


module.exports = router