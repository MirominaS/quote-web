import React from 'react'
import './Input.css'

const Input = ({type,placeholder,height='30px',width='100px',value,handleChange,maxWidth,border='none'}) => {
  return (
    <div className='input-container'>
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            style={{width,height,maxWidth,border}}
        />
    </div>
  )
}

export default Input