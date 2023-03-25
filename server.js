const express = require('express')
const studentRoutes = require('./src/student/routes')

const app = express()
const port = 3000

app.use(express.json())

app.use('/api/v1/students', studentRoutes)

app.get('/', (req, res) => {
  res.send('fallback')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
