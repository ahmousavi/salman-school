const router = require('express').Router();
const User = require('./../models/user.model')
const bcrypt = require('bcrypt')
const { SECRET_KEY } = require('./../config')
const { checkToken } = require('./../utiles')
router.get('/login', function (req, res) {
    let token = req.cookies['sch-token'] || null
    if (token) {
        User.findOne({ token: token }, (err, user) => {
            if (err) {
                console.log('Error', err);
                res.render('error', { error: err })
            }
            else if (user) {
                res.redirect('/panel')
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
                    req.user = user
                    res.redirect('/panel')
                }
                else {
                    res.redirect('login')
                }
            })
        }
        else {
            res.redirect('login')
        }
    })

})

router.get('/logout', checkToken, function (req, res) {
    res.cookie('sch-token', '', { maxAge: 0, httpOnly: true });
    res.redirect('/login')
})

router.get('/panel', checkToken ,function (req, res) {
    console.log('CheckToken', req.user);
    
    if (req.user.user_type === 'Student') {
        res.render('panel_stu', {user: res.user})
    }
    else if (req.user.user_type === 'Employee') {
        res.render('panel_emp', {user: res.user})
    }
})


module.exports = router