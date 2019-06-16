const router = require('express').Router();
const User = require('../models/user.model')
const Employee = require('../models/employee.model')
const { checkToken } = require('../utiles')
const Letter = require('../models/letter.model')
router.get('/', checkToken ,function (req, res) {
    console.log('CheckToken', req.user);
    
    if (req.user.user_type === 'Student') {
        res.render('panel_stu', {user: res.user})
    }
    else if (req.user.user_type === 'Employee') {
        res.render('panel_emp', {user: res.user})
    }
})


router.get('/letter', checkToken, function (req, res) {
    Employee.find({}, (err, emps) => {
        if (err) {
            res.render('error', {error: err})
        }
        else {
            let a = [1,2,3,4,5]
            res.render('sendLetter', {user: req.user, employees: emps});
        }
    })
})

router.post('/letter', checkToken, function (req, res) {
    let letter = new Letter()
    letter.sender = req.user._id
    letter.reciver = req.body.reciver
    letter.title = req.body.title
    letter.text = req.body.text
    letter.save().then(letter => {
        res.send({...letter})
    })
    .catch(err => res.render('error', {error: err}))
})



module.exports = router