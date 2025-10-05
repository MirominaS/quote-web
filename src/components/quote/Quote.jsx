import React, { useState } from 'react'
import './Quote.css'


const Quote = ({tag,quote,by,ref,style}) => {

  return (
    <div className='quote-container' ref={ref} style={style}>        
      <div className='quote-detail'  >
          <div className='quote-detail-tag ' style={{...style,backgroundColor: "#ffffff80"}}>{tag}</div>
          <div className='quote-detail-quote' style={style}>{quote}</div>
          <div className='quote-detail-by' style={style}>- {by} -</div>
      </div>       
    </div>
  )
}

export default Quote