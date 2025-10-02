import React, { useState } from 'react'
import Button from '../../components/button/Button'
import './Home.css'
import Quote from '../../components/quote/Quote'
import { FaCircleUp } from "react-icons/fa6";
import { FaCircleDown } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const Home = () => {
    const [showUp, setShowup] = useState(false);
    const [showUpClicked, setShowupClicked] = useState(false);
    const [upCount, setUpCount] = useState(15);
    const [showDown, setShowDown] = useState(false);
    const [showDownClicked, setShowDownClicked] = useState(false);
    const [downCount, setDownCount] = useState(200)
    const quoteDetails = [
        {id: 1,tag:"#Success", quote:"Success is not final, failure is not fatal: it is the courage to continue that counts", by:"Winston Churchill"},
        // {id: 2,tag:"#Motivation", quote:"Do what you can, with what you have, where you are.", by:"Theodore Roosevelt"},
        // {id: 3,tag:"#Productivity", quote:"Don't count the days, make the days count.", by:"Muhammad Ali"},
        // {id: 4,tag:"#Confidence",  quote:"Doubt kills more dreams than failure ever will.", by:"Suzy Kassem"}
    ];
  
    const handleUpCount = (showUpClicked) => {    
      let count = upCount;
      if(showUpClicked === true){ 
        count += 1;      
        setUpCount(count);
      }
      if(showUpClicked === false){        
        setUpCount(upCount - 1);
      }
      {console.log(showUpClicked)}
    }

    const handleDownCount = (showDownClicked) => {
      let count = downCount;
      if(showDownClicked === true){
        count += 1;
        setDownCount(count);
      }
      if(showDownClicked === false){
        setDownCount(downCount - 1)
      }
    }
    const handleUpDown = ({handleUpCount,handleDownCount}) => {
      if(handleUpCount){
        handleDownCount(!showDownClicked)
      }
      if(handleDownCount){
        handleUpCount(!showUpClicked)
      }
    }
  
  return (
    <div className='home-container'>
        <Quote details={quoteDetails}/>
        <div className='home-details'>
          <div className='home-details-view'>
            <div className='home-details-like-comment'>
            <div className='home-details-like' onClick={handleUpDown}>
              <div 
                className='show-icon' 
                onClick={() => {
                  setShowupClicked(!showUpClicked);
                  handleUpCount(!showUpClicked,15);
                }}
                onMouseEnter={() => setShowup(true)} 
                onMouseLeave={() => setShowup(false)}
              >
                {(showUp  || showUpClicked )? <FaCircleUp/>: < FaRegArrowAltCircleUp/>}
                {upCount}
              </div>

              <div 
                className='show-icon' 
                onClick={() => {
                  setShowDownClicked(!showDownClicked);
                  handleDownCount(!showDownClicked)

                }}
                onMouseEnter={() => setShowDown(true)} 
                onMouseLeave={() => setShowDown(false)}
              >
                {(showDown || showDownClicked)?  <FaCircleDown /> : <FaRegArrowAltCircleDown />}
                {downCount}
              </div>  

            </div>
            <div className='home-details-comment show-icon'>
              <FaComment />
              {"250"}
            </div>
            </div>
            <div className='home-details-share '>
              <FaShareSquare />
            </div>   
          </div>
          <div className='home-details-signup'>
            <h2 className='home-details-signup-request'>Would you like to write your own?</h2>
            <h2 className='home-details-signup-btn'>Sign up</h2>
            
          </div>        
        </div>
    </div>
  )
}

export default Home