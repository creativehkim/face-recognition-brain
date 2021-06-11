import React, { useState } from 'react'

const Signin = ({ onRouteChange }) => {
  const [ signInEmail, setSignInEmail ] = useState('')
  const [ signInPassword, setSignInPassword ] = useState('')

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value)
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => console.log(response))
    .then(data => {
      console.log(data)
      // if(data === 'success') {
      //   onRouteChange('home')
      // }
    }).catch(err => {
      console.log(err)
    })
    console.log(signInEmail, signInPassword)
  }

  return (
    <article className="br3 ba b--black-10 shadow-5 mv6 w-100 w-50-m w-25-l mw5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  onChange={onEmailChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={onPasswordChange}
                  />
              </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in" 
              onClick={onSubmitSignIn}
              />
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=> onRouteChange('register')} className="pointer f6 link dim black db">Register</p>
            
          </div>
        </div>
      </main>
    </article>
  )
}

export default Signin
