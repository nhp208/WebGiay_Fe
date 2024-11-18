import React from 'react'
import { HeaderComponent } from '../Header/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

export function DefaultComponent(props) {
  return (
    <div>
      <HeaderComponent/>
      {props.children}
      <FooterComponent/>
    </div>
  )
}

