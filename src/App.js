import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'

import 'tachyons'
import './App.css'

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component { 
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onPictureSubmit = () => {
    if(!this.state.input) {
      alert('Please fill in the image input')
    } else {
      this.setState({imageUrl: this.state.input})
        fetch('https://boiling-anchorage-86212.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log('hi', response)
          if(response) {
            fetch('https://boiling-anchorage-86212.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
              id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            // Error handling
            .catch(console.log)
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
        })  
        .catch(err => {
          console.log(err)
        })
    }  
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return(
    <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home' 
        ? <div>
            <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : ( 
          route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )
      }
      
    </div>
  );
}
}

export default App;
