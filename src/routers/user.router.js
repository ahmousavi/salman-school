const router = require('express').Router();
const Student = require('./../models/student.model')
const User = require('./../models/user.model')
const Employee = require('../models/employee.model')
// /user/*
router.get('/', function (req, res) {
    // let stu = new Employee();
    // stu.first_name = 'جعفر'
    // stu.last_name = 'قلی زاده'
    // stu.role = 'مدیر'
    // stu.father_name = 'حسن'
    // stu.birthday = '1353/11/24'
    // stu.national_code = '0924895226'
    // stu.password = '123123'
    // stu.year_employed = '1390'
    // stu.save()
    // .then(user => console.log('User', user))
    // .catch(err => console.error('#Error', err))
    res.send('OK');
})
module.exports = router