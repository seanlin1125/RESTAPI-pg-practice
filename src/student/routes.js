const express = require('express')
const studentController = require('./controller')

const router = express.Router()

router.get('/', studentController.getStudents)
router.post('/', studentController.addStudent)
router.get('/:id', studentController.getStudentById)
router.delete('/:id', studentController.removeStudent)

module.exports = router
