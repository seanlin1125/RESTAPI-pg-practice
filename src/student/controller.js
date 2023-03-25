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
  removeStudent: (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length
      if (noStudentFound) {
        res.send('Student does not exist in the database.')
      }
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error
        res.status(200).send('Students removed successfully!')
      })
    })
  },
  updateStudent: (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length
      if (noStudentFound) {
        res.send('Student does not exist in the database.')
      }
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error
        res.status(200).send('Students updated successfully!')
      })
    })
  },
}

module.exports = studentController
