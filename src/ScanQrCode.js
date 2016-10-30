import React from 'react'
import qrCodeStore from './qrCodeStore'

export default class ScanQrCode extends React.Component {
  componentWillMount () {
    wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode'],
      success: (res) => {
        qrCodeStore.setQrcode(res.resultStr)
        this.props.router.push('send')
      }
    })
  }

  render () {
    return (<div />)
  }
}