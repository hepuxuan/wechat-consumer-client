import React from 'react'

const Input = props => {
  const {label, ...inputProps} = props

  return (
    <div className='weui-cell'>
      <label>
        {props.value ? <div>{props.label}</div> : null}
        <input className='weui-input' {...inputProps} placeholder={props.label} />
      </label>
    </div>
  )
}

export default Input
