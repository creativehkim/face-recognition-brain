import {useState} from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
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

function App() {
  const [ input, setInput ] = useState('')

  const onInputChange = (e) => {
    console.log(e.target.value)
  }

  const onButtonSubmit = () => {
    console.log('clicked')
  }

  return (
    <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      
      {/* 
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
