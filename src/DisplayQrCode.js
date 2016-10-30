/* globals localStorage */

import React from 'react'
import QRCode from 'qrcode.react'
import { Link } from 'react-router'

const DisplayQrCode = props => {
  const invoice = localStorage.getItem('invoice')
  return (<div>
    <h1>浏览二维码</h1>
    { invoice
      ? <QRCode size={256} value={invoice} /> : (
        <div className='alert-warning alert'>
          <strong>警告!</strong> 您还没有可用二维码，请先
          <Link to='create'> 生成二维码</Link>
        </div>
      )}
  </div>)
}
export default DisplayQrCode
