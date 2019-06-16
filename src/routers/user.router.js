const router = require('express').Router();
const Student = require('./../models/student.model')
const User = require('./../models/user.model')
const Employee = require('../models/employee.model')
// /user/*
router.get('/', function (req, res) {
    let user1 = new Employee();
    user1.first_name = 'عباس'
    user1.last_name = 'زارع'
    user1.father_name = 'حمید'
    user1.birthday = '1348/5/1'
    user1.national_code = '123456780'
    user1.password = '123123'
    user1.year_employed = '1374'
    user1.role = 'مدیریت'
    user1.save()
    .then(user => console.log('The fake user1 created'))
    .catch(err => res.render('error', { error: err }))

    let user2 = new Employee();
    user2.first_name = 'علی اکبر'
    user2.last_name = 'جانفدا'
    user2.father_name = 'محمد'
    user2.birthday = '1348/5/1'
    user2.national_code = '123456781'
    user2.password = '123123'
    user2.year_employed = '1374'
    user2.role = 'معاون آموزشی'
    user2.save()
    .then(user => console.log('The fake user2 created'))
    .catch(err => res.render('error', { error: err }))

    let user3 = new Employee();
    user3.first_name = 'جعفر'
    user3.last_name = 'قلی زاده'
    user3.father_name = 'محسن'
    user3.birthday = '1348/5/1'
    user3.national_code = '123456782'
    user3.password = '123123'
    user3.year_employed = '1374'
    user3.role = 'معاون پرورشی'
    user3.save()
    .then(user => console.log('The fake user3 created', user))
    .catch(err => res.render('error', { error: err }))

    res.send({user1, user2, user3});
})

module.exports = router