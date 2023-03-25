const pool = require('../../db')
const queries = require('./queries')

const studentController = {
  getStudents: (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)
    })
  },
  getStudentById: (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)
    })
  },
  addStudent: (req, res) => {
    const { name, email, age, dob } = req.body

    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length) {
        res.send('Email already exists.')
      }
      res.status(200).json(results.rows)
    })
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error
        res.status(201).send('Students created successfully!')
      }
    )
  },
}

module.exports = studentController
