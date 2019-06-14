const router = require('express').Router();
const Student = require('./../models/student.model')
const User = require('./../models/user.model')
const Employee = require('../models/employee.model')
// /user/*
router.get('/', function (req, res) {
    let stu = new Student();
    stu.first_name = 'امیر'
    stu.last_name = 'موسوی'
    stu.father_name = 'حسین'
    stu.birthday = '1378/5/1'
    stu.national_code = '0924895225'
    stu.password = '123123'
    stu.total_average = 18.39
    stu.save()
    .then(user => console.log('User', user))
    .catch(err => console.error('#Error', err))
    res.send('OK');
})

module.exports = router