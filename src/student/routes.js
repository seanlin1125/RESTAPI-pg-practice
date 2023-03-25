const express = require('express')
const studentController = require('./controller')

const router = express.Router()

router.get('/', studentController.getStudents)
router.post('/', studentController.addStudent)
router.get('/:id', studentController.getStudentById)

module.exports = router
