import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react'
import { InputFormStyled } from './style'
function InputForm(props) {
  const{type='text',placeholder='Nhập thông tin',...rests}=props
  return (
    <InputFormStyled type={type} placeholder={placeholder} value={props.value} {...rests} onChange={props.onChange}/>
  )
}

export default InputForm