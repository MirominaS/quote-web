import React, { useState, useEffect} from 'react'
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigDownFilled } from "react-icons/tb";
import './Vote.css'


const Vote = ({status,upcount,downcount}) => {
    const [showUpClicked, setShowupClicked] = useState(false);
    const [upCount, setUpcount] = useState(upcount);
    const [showDownClicked, setShowDownClicked] = useState(false);
    const [downCount, setDownCount] = useState(downcount)

    const handleUpCount = () => {
        setShowupClicked(!showUpClicked);
        let check = !showUpClicked;
        if(check){
            setUpcount(upCount + 1);
            if(showDownClicked){
                setDownCount(downCount - 1)
                setShowDownClicked(false)
            }
        }else{
            setUpcount(upCount - 1)
        }
    }

    const handleDownCount = () => {        
        setShowDownClicked(!showDownClicked);
        let check = !showDownClicked;
        if(check){
            setDownCount(downCount + 1)
            if(showUpClicked){
                setUpcount(upCount - 1)
                setShowupClicked(false)
            }
        }else{
            setDownCount(downCount - 1)
        }
        console.log({status})
    }

    const getBackgroundColor = () => {
        if(showUpClicked){
            return "#75ff81ff";
        }if(showDownClicked){
            return "#ff7575ff";
        }
        return "#ffffff";
    }

    useEffect(() => {
      if(status === 1){
            setShowupClicked(true);
            console.log("cloc")
        }else if(status === -1){
            setShowDownClicked(true)
        }else{
            setShowupClicked(false);
            setShowDownClicked(false);
        }
    }, [status])
    

  return (
    <div className='vote-container' style={{background:getBackgroundColor()}}>
        <div className='vote-upvote' onClick={handleUpCount} >
            {showUpClicked ?   <TbArrowBigUpFilled /> : <TbArrowBigUp />}                         
            {upCount}
        </div>
        <div className='vote-downvote' onClick={handleDownCount}>
            {showDownClicked ? <TbArrowBigDownFilled /> :<TbArrowBigDown />}
            {downCount}
        </div>
    </div>
  )
}

export default Vote