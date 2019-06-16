const router = require('express').Router();
const User = require('../models/user.model')
const Student = require('../models/student.model')
const Employee = require('../models/employee.model')
const { checkToken } = require('../utiles')
const Letter = require('../models/letter.model')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/attachments')
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + '-' +file.originalname)
    }
})

const upload = multer({ storage: storage })


router.get('/', checkToken, function (req, res) {
    console.log('CheckToken', req.user);

    if (req.user.user_type === 'Student') {
        res.render('panel_stu', { user: req.user, 'layout': 'layouts/stupanel' })
    }
    else if (req.user.user_type === 'Employee') {
        res.render('panel_emp', { user: req.user })
    }
})

router.get('/letter', checkToken, function (req, res) {
    Letter.find({ reciver: req.user._id })
        .populate('sender')
        .exec((err, recivedLetters) => {
            if (err) {
                res.render('error', { error: err })
            }
            else {
                Letter.find({ sender: req.user._id }).populate('reciver')
                    .then(sentLetters => {
                        res.render('letterBox', { sentLetters, recivedLetters })
                    })
                    .catch(err => res.render('error', { error: err }))
            }
        })
})

router.get('/letter/new', checkToken, function (req, res) {
    Employee.find({ _id: { $ne: req.user._id } }, (err, emps) => {
        if (err) {
            res.render('error', { error: err })
        }
        else {
            let a = [1, 2, 3, 4, 5]
            res.render('sendLetter', { user: req.user, employees: emps, letter: {} });
        }
    })
})

router.post('/letter', checkToken, upload.single('attachment'), function (req, res) {
    let letter = new Letter()
    letter.sender = req.user._id
    letter.reciver = req.body.reciver
    letter.title = req.body.title
    letter.text = req.body.text
    if (req.file) {
        letter.attachment = req.file.filename
    }
    letter.save().then(letter => {
        res.redirect('/panel/letter')
    })
        .catch(err => res.render('error', { error: err }))
})

router.get('/letter/:id', checkToken, function (req, res) {
    Letter.find({ _id: req.params.id }).populate('sender')
        .then(letter => {
            res.render('viewLetter', { letter })
        })
        .catch(err => res.render('error', { error: err }))
})

router.get('/letter/:id/reply', checkToken, function (req, res) {
    Letter.find({ _id: req.params.id }).populate('sender')
        .then(letter => {
            res.render('sendLetter', { letter, reply: true, })
        })
        .catch(err => res.render('error', { error: err }))
})

router.get('/student/new', checkToken, function (req, res) {
    res.render('newStudent')
})

router.post('/student/new', checkToken, function (req, res) {
    let stu = new Student()
    stu.first_name = req.body.firstname
    stu.last_name = req.body.lastname
    stu.father_name = req.body.fathername
    stu.birthday = req.body.birthday
    stu.national_code = req.body.natcode
    stu.password = req.body.password
    stu.address = req.body.address

    stu.save()
        .then(user => res.redirect('/panel/student'))
        .catch(err => res.render('error', { error: err }))
})

router.get('/student/:key?', checkToken, function (req, res) {
    const key = req.query.key;
    if (key) {
        Student.find({ $or:[ {'national_code': key}, {'last_name':key}, ]}).then(students => {
            res.render('students', {students})
        })
        .catch(err => res.render('error', { error: err }))
    }
    else {
        Student.find({}).then(students => {
            res.render('students', {students})
        })
        .catch(err => res.render('error', { error: err }))
    }
    // res.render('students')
})

module.exports = router