const router = require('express').Router();
const Student = require('./../models/student.model')
const User = require('./../models/user.model')

// /user/*
router.get('/', function (req, res) {
    let stu = new User();
    stu.first_name = 'amir'
    stu.last_name = 'mousavi'
    stu.father_name = 'hosein'
    stu.national_code = '0924895225'
    stu.password = '123123'
    stu.save()
    .then(user => console.log('User', user))
    .catch(err => console.error('#Error', err))
    res.send('OK');
})
module.exports = router