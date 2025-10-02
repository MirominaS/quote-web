import React from 'react'
import './Quote.css'

const Quote = ({details}) => {
  return (
    <div className='quote-container'>
        {details?.map((detail) => (
                <div key={detail.id} className='quote-detail'>
                    <div className='quote-detail-tag'>{detail.tag}</div>
                    <div className='quote-detail-quote'>{detail.quote}</div>
                    <div className='quote-detail-by'>- {detail.by} -</div>
                </div>
                
                )
            )
        }
        
    </div>
  )
}

export default Quote