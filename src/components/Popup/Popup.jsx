import React from 'react'
import './Popup.css'

const Popup = ({task,label,showPopup,closePopup,position,left,top}) => {

    if(!showPopup) return null;

  return (
    <div className='success-popup-container' style={{position,left,top}}>
        <div className='popup-task'>{task}</div>
        <button className='popup-button' onClick={closePopup}>{label}</button>
    </div>
  )
}

export default Popup