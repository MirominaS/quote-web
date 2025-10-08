import React from 'react'
import './CommentQuote.css'
import { FaComment } from "react-icons/fa6";

const CommentQuote = ({count,handleCommentClick,successStatus}) => {
  return (
    <div className='comment-container' onClick={()=> !successStatus && handleCommentClick()}>
        <FaComment />
        {count}
    </div> 
  )
}

export default CommentQuote