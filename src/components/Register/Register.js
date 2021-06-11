import React, { useState } from 'react'

const Signin = ({ onRouteChange, loadUser }) => {
  const [ signInEmail, setSignInEmail ] = useState('')
  const [ signInPassword, setSignInPassword ] = useState('')
  const [ signInName, setSignInName ] = useState('')

  const onNameChange = (e) => {
    setSignInName(e.target.value)
  }
  
  const onEmailChange = (e) => {
    setSignInEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value)
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: signInName,
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user) {
        loadUser(user)
        onRouteChange('home')
        console.log(user)
      }
    })
  }

  return (
    <article className="br3 ba b--black-10 shadow-5 mv6 w-100 w-50-m w-25-l mw5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={onNameChange}
                  />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="email-address"  
                  id="email-address"
                  onChange={onEmailChange}/>
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
              value="Register" 
              onClick={onSubmitSignIn}
              />
          </div>
        </div>
      </main>
    </article>
  )
}

export default Signin
