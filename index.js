const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

//parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index.ejs", { files: files })
  })
})

app.get('/notes/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}.txt`, 'utf-8', (err, data) => {
    res.render('show', { title: req.params.filename, content: data })
  })
})

app.post('/notes', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.content, (err) => {
    res.redirect('/')
  })
})

app.get('/about/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`)
})

app.get('/about/:name/:age', (req, res) => {
  res.send(`Hello ${req.params.name}, you are ${req.params.age}`)
})

app.listen(3100, () => {
  console.log('Server is running on http://localhost:3100')
})


