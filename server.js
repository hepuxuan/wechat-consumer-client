var express = require('express')
var config = require('./src/config.js')
var app = express()
var PORT = process.env.PORT || 8080

app.get('/interface', function (req, res) {
  var echostr = req.query.echostr
  res.send(echostr)
})

app.get('/config', function (req, res) {
  config.getConfig(function (config) {
    res.send(config)
  })
})

app.use('/', express.static('public'))

app.listen(PORT, function () {
  console.log('Example app listening on port' + PORT + '!')
})
