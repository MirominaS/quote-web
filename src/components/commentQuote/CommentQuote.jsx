import React from 'react'
import './CommentQuote.css'
import { FaComment } from "react-icons/fa6";

const CommentQuote = ({count}) => {
  return (
    <div className='comment-container'>
        <FaComment />
        {count}
    </div>
  )
}

export default CommentQuote