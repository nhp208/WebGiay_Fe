import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export function ButtonInputSearch(props) {
    const {size,placeholder,textButton,bordered,
        backgroundColorInput='#fff',
        backgroundColorButton='#ff3f00',
        colorTextButton='#fff',
        onClick
    } = props;
  return (
    <div style={{display:'flex'}}>
        <InputComponent 
            size={size} 
            placeholder={placeholder} 
            style={{
                backgroundColor: backgroundColorInput,
                border:bordered,
                borderRadius:0,
                }} 
            {...props}
        />
        <ButtonComponent
            onClick={onClick}
            size={size}  
            styleButton={{
                color: colorTextButton ,
                backgroundColor: backgroundColorButton,
                border:bordered,
                borderRadius:0,
                margin: '0 0 0 -2px',
            }} 
            icon={<SearchOutlined  />}
            textButton={textButton}
        />
    </div>
  )
}

