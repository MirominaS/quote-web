import React from 'react'
import './Quote.css'
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";

const Quote = ({details,style}) => {
  return (
    <div className='quote-container'>
      <div className='quote-prev' style={style}><FaCaretLeft /></div>
        {details?.map((detail) => (
                <div key={detail.id} className='quote-detail' >
                    <div className='quote-detail-tag ' style={style}>{detail.tag}</div>
                    <div className='quote-detail-quote' style={style}>{detail.quote}</div>
                    <div className='quote-detail-by' style={style}>- {detail.by} -</div>
                </div>
                
                )
            )
        }
        <div className='quote-next' style={style}><FaCaretRight /></div>
        
    </div>
  )
}

export default Quote