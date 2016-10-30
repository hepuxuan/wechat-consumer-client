/* globals localStorage */

import React from 'react'
import Input from './Input'
import { Link } from 'react-router'

export default class CreateInvoice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...JSON.parse(localStorage.getItem('invoice')),
      success: false
    }
    this.onCompanyNameChange = this.onCompanyNameChange.bind(this)
    this.onTaxPayerNumberChange = this.onTaxPayerNumberChange.bind(this)
    this.onPhoneChange = this.onPhoneChange.bind(this)
    this.onAddressChange = this.onAddressChange.bind(this)
    this.onBankNameChange = this.onBankNameChange.bind(this)
    this.onBankAccountChange = this.onBankAccountChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCompanyNameChange (e) {
    this.setState({
      companyName: e.target.value
    })
  }

  onTaxPayerNumberChange (e) {
    this.setState({
      taxPayerNumber: e.target.value
    })
  }

  onPhoneChange (event) {
    this.setState({
      phone: event.target.value
    })
  }

  onAddressChange (event) {
    this.setState({
      address: event.target.value
    })
  }

  onBankNameChange (event) {
    this.setState({
      bankName: event.target.value
    })
  }

  onBankAccountChange (event) {
    this.setState({
      bankAccount: event.target.value
    })
  }

  onSave (e) {
    e.preventDefault()
    localStorage.setItem('invoice', JSON.stringify(this.state))
    this.setState({
      success: true
    })
  }

  onCancel (e) {
    e.preventDefault()
    this.setState({
      ...JSON.parse(localStorage.getItem('invoice')),
      success: false
    })
  }

  render () {
    return (
      <div>
        <h1>增值税模版</h1>
        {this.state.success
          ? (
            <div className='alert-success alert'>
              成功创建增值税模版，您现在可以
              <Link to='scan'>扫描二维码</Link>
            </div>) : null}
        <form>
          <div className='weui-cells weui-cells_form'>
            <Input
              value={this.state.companyName}
              onChange={this.onCompanyNameChange}
              label='公司名称：' />
            <Input
              value={this.state.taxPayerNumber}
              type='number' pattern='[0-9]*'
              onChange={this.onTaxPayerNumberChange}
              label='纳税人识别号：' />
            <Input value={this.state.address}
              onChange={this.onAddressChange}
              label='地址：' />
            <Input value={this.state.phone}
              type='number'
              pattern='[0-9]*'
              onChange={this.onPhoneChange}
              label='电话：' />
            <Input value={this.state.bankName}
              onChange={this.onBankNameChange}
              label='开户银行：' />
            <Input value={this.state.bankAccount}
              type='number'
              pattern='[0-9]*'
              onChange={this.onBankAccountChange} label='开户银行帐号：' />
          </div>
          <p className='weui-btn-area'>
            <button type='submit' onClick={this.onSave} className='weui-btn weui-btn_primary'>保存</button>
            <button onClick={this.onCancel} className='weui-btn weui-btn_warn'>取消</button>
          </p>
        </form>
      </div>
    )
  }
}
