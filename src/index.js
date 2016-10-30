import React from 'react'
import ReactDOM from 'react-dom'
import CreateQrCode from './CreateQrCode'
import DisplayQrCode from './DisplayQrCode'
import { Router, Route, hashHistory, Link } from 'react-router'
import 'es6-promise'
import 'whatwg-fetch'

const Base = props => (
  <div className='weui-tab'>
    <div className='weui-navbar'>
      <div className='weui-navbar__item weui-bar__item_on'>
        <Link to='create'>创建二维码</Link>
      </div>
      <div className='weui-navbar__item weui-bar__item_on'>
        <Link to='show'>浏览二维码</Link>
      </div>
    </div>
    <div className='weui-tab__panel'>
      {props.children}
    </div>
  </div>
)

const AppRouter = props => (
  <Router history={hashHistory}>
    <Route path='/' component={Base}>
      <Route path='create' component={CreateQrCode} />
      <Route path='show' component={DisplayQrCode} />
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
    jsApiList: ['scanQRCode']
  })
})
