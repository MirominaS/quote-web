import React from 'react'
import Input from '../input/Input'
import './AddQuote.css'

const AddQuote = () => {
  return (
    <div className='addquote-container'>
        <div className='addquote-title'> Add a Quote </div>
        <div className='addquote-quote'>
            <Input/>
        </div>
        <div className='addquote-tags'>
            <Input/>
        </div>
        <div className='addquote-author'>
            <Input/>
        </div>
        <div className='addquote-button'>
            <div className='addquote-cancel-btn'>
                <button>Cancel</button>
            </div>
            <div className='addquote-add-btn'>
                <button>Add</button>
            </div>
        </div>
        
    </div>
  )
}

export default AddQuote