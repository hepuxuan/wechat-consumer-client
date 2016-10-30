var url = require('url')
var crypto = require('crypto')
var request = require('request')
var fs = require('fs')

var appId = 'wxa82cbb188ae6206a'
var appSecret = 'ff1674f69ef14bf1535d79fe45465fce'
var url = 'http://wechat-ck-client.herokuapp.com/'


function getToken(cb) {
  var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=' + appId + '&secret=' + appSecret
  request.get(tokenUrl, function(error, response, body) {
    if (error) {
      cb('getToken error', error)
    } else {
      try {
        var token = JSON.parse(body).access_token
        cb(null, token)
      } catch (e) {
        cb('getToken error', e)
      }
    }
  })
}

function getNewTicket(token, cb) {
  request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi', function(error, res, body) {
    if (error) {
      cb('getNewTicket error', error)
    } else {
      try {
        var ticket = JSON.parse(body).ticket
        cb(null, ticket)
      }
      catch (e) {
        cb('getNewTicket error', e)
      }
    }
  });
}

function getTimesTamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}
function getNonceStr() {
  return Math.random().toString(36).substr(2, 15)
}

function getConfig (cb) {
  getToken(function (error, token) {
    getNewTicket(token, function (error, result) {
      var timestamp = getTimesTamp()
      var noncestr = getNonceStr()
      var str = 'jsapi_ticket=' + result + '&noncestr='+ noncestr+'&timestamp=' + timestamp + '&url=' + url

      var signature = crypto.createHash('sha1').update(str).digest('hex')
      cb({
        appId: appId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature
      })
    })
  })
}

module.exports = {
  getConfig: getConfig
}
