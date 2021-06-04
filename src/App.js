import {useState} from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import 'tachyons'
import './App.css'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'



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
  const [ imageUrl, setImageUrl] = useState('')
  const [ box, setBox ] = useState({})
  const [ route, setRoute ] = useState('signin')


  const app = new Clarifai.App({
    apiKey: "6862fc53ace64fe79028edaec5a14eb8",
  })

  const calculateFacelocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log(box)
    setBox(box)
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onButtonSubmit = () => {
    setImageUrl(input)

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      input
    )
    .then((response) => {
      displayFaceBox(calculateFacelocation(response))
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onRouteChange = (route) => {
    setRoute(route)
  }

  return (
    <div className="App">
      
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange}/>
      { route === 'signin' 
        ? <Signin onRouteChange={onRouteChange}/>
        : <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
      }
      
    </div>
  );
}

export default App;
