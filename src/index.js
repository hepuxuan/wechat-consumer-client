import React from 'react'
import ReactDOM from 'react-dom'
import CreateInvoice from './CreateInvoice'
import SendQrCode from './SendQrCode'
import ScanQRCode from './ScanQRCode'
import { Router, Route, hashHistory, Link } from 'react-router'
import qrCodeStore from './qrCodeStore'
import 'es6-promise'
import 'whatwg-fetch'

const Base = props => {
  return (
    <div className='weui-tab'>
      <div className='weui-navbar'>
        <div className='weui-navbar__item weui-bar__item_on'>
          <Link to='create'>创建增值税模版</Link>
        </div>
        <div className='weui-navbar__item weui-bar__item_on'>
          <Link to='scan'>扫描二维码</Link>
        </div>
      </div>
      <div className='weui-tab__panel'>
        {props.children}
      </div>
    </div>
  )
}

const AppRouter = props => (
  <Router history={hashHistory}>
    <Route path='/' component={Base}>
      <Route path='create' component={CreateInvoice} />
      <Route path='send' component={SendQrCode} />
      <Route path='scan' component={ScanQRCode} />
    </Route>
  </Router>
)

fetch('/config').then((res) => {
  if (res.ok) {
    return res.json()
  }
}).then((config) => {
  wx.ready(() => {
    ReactDOM.render(<AppRouter />, document.getElementById('root'))
  })
  wx.config({
    ...config,
    jsApiList: ['scanQRCode', 'getLocation']
  })
})
