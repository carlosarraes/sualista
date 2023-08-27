import express from 'express'

const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})