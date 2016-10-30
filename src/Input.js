import React from 'react'

const Input = props => (
  <div className='weui-cell'>
    <div className='weui-cell__hd'><label className='weui-label'>{props.label}</label></div>
    <div className='weui-cell__bd'>
      <input className='weui-input' {...props} />
    </div>
  </div>
)

export default Input
