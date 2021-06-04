import React from 'react'

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className='center ma'>
      <div className="absolute mt4">
        <img src={imageUrl} alt="face detect target" width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceRecognition
