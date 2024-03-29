import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3 mb4" style={{lineHeight:'1.5'}}>
        This Magic Brain will detect faces in your pictures.<br/> Give it a try!
      </p>
      <div className='center'>
        <div className='form pa4 br3 shadow-5'>
          <input 
            type="text" 
            className="f4 pa2 bn fl w-two-thirds center" 
            onChange={onInputChange}  
            />
          <button 
            className='fl w-third grow f4 link ph3 pv2 bn white bg-blue'
            onClick={onPictureSubmit}
          >Detect</button>
        </div>
      </div>      
    </div>
  )
}

export default ImageLinkForm
