var express = require('express')
var config = require('./src/config.js')
var crypto = require('crypto')

var app = express()
var PORT = process.env.PORT || 8080

var token='wechat-ck-client19881117';

app.get('/interface', function (req, res) {
  var signature = req.query.signature
  var timestamp = req.query.timestamp
  var echostr = req.query.echostr
  var nonce = req.query.nonce

  var oriArray = [nonce, timestamp, token]
  oriArray.sort()
  var scyptoString = crypto.createHash('sha1').update(oriArray.join('')).digest('hex')
  if (signature === scyptoString) {
    res.send(echostr)
  } else {
    res.send('invalid')
  }
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
