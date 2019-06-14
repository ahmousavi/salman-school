const User = require('./models/user.model')

function checkToken(req, res, next) {
    let token = req.cookies['sch-token'] || null
    if (req.user) {
        next();
    }
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
        res.redirect('/login')
    }
}

module.exports = {
    checkToken,
}