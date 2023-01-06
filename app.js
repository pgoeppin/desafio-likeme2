const app = require('./server')
const express = require('express')

app.use('/', require('./src/routes/postRoutes'))

app.use(express.static("./src/public"))

module.exports = app