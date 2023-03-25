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
}

module.exports = studentController
