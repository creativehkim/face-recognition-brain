import React from 'react'
import Logo from '../Logo/Logo'
import './Navigation.css'


const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn) {
      return (
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Logo />
        <p onClick={() => onRouteChange('signout')}className='f4 grow no-underline br-pill ba ph4 pv3 dib mr3 mt3 near-black pointer'
        style={{height: 'auto'}}>Sign Out</p>
      </nav>
      )
    } else {
      return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')}className='f4 grow no-underline br-pill ba ph4 pv3 dib mr3 near-black pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')}className='f4 grow no-underline br-pill ba ph4 pv3 dib mr4 near-black pointer'>Register</p>
      </nav>
      )
    }
}

export default Navigation
