/* globals wx, localStorage */

import React from 'react'
import qrCodeStore from './qrCodeStore'
import { Link } from 'react-router'
import cIWebSocket from './webSocket'

function getClientId (qrCode) {
  let clientId
  try {
    clientId = JSON.parse(qrCode).clientId
  } catch (e) {

  }

  return clientId
}

export default class SendQrCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.sendInvoice = this.sendInvoice.bind(this)
  }

  componentDidMount () {
    this.setState({
      clientId: getClientId(qrCodeStore.getQrCode()),
      invoice: JSON.parse(localStorage.getItem('invoice'))
    })
    this.eventId = qrCodeStore.subscribeToUpdate((qrCode) => {
      this.setState({
        clientId: getClientId(qrCodeStore.getQrCode()),
      })
    })
  }

  componentWillUnmount () {
    qrCodeStore.unsubscribeToUpdate(this.eventId)
  }

  sendInvoice (e) {
    e.preventDefault()
    cIWebSocket.sendInvoice(this.state.invoice, this.state.clientId, () => {
      this.props.router.push('create')
    })
  }

  render () {
    return (
      <div>
        {(this.state.clientId && this.state.invoice)
          ? (
            <div>
              <h1>扫描二维码</h1>
              <div className='weui-msg'>
                <div className='weui-msg__icon-area'><i className='weui-icon-success weui-icon_msg'></i></div>
                <div className='weui-msg__text-area'>
                  <h2 className='weui-msg__title'>扫描成功</h2>
                  <p className='weui-msg__desc'>您现在可以将您的税表信息发送至客户端</p>
                </div>
                <div className='weui-msg__opr-area'>
                  <p className='weui-btn-area'>
                    <button onClick={this.sendInvoice} className='weui-btn weui-btn_primary'>发送</button>
                    <Link to='#' className='weui-btn weui-btn_default'>取消</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
      </div>
    )
  }
}
