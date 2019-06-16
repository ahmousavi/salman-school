const router = require('express').Router();
const Student = require('./../models/student.model')
const User = require('./../models/user.model')
const Employee = require('../models/employee.model')
// /user/*
router.get('/', function (req, res) {
    let stu = new Employee();
    stu.first_name = 'خسرو'
    stu.last_name = 'یونسی'
    stu.father_name = 'حمید'
    stu.birthday = '1348/5/1'
    stu.national_code = '0924895227'
    stu.password = '123123'
    stu.year_employed = '1382'
    stu.role = 'معاون آموزشی'
    stu.save()
    .then(user => console.log('User', user))
    .catch(err => console.error('#Error', err))
    res.send('OK');
})

module.exports = router