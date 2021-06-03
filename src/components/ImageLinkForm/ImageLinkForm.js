import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 bcenter">
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className='center'>
        <div className='form pa4 br3 shadow-5'>
          <input 
            type="text" 
            className="f4 pa2 bn fl w-two-thirds center" 
            onChange={onInputChange}  
            />
          <button 
          className='fl w-third grow f4 link ph3 pv2 bn white bg-light-pink'
          onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>      
    </div>
  )
}

export default ImageLinkForm
