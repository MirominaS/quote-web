import React, { useRef, useState } from 'react'
import Quote from '../../components/quote/Quote'
import { FaCircleUp } from "react-icons/fa6";
import { FaCircleDown } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { ChromePicker } from 'react-color';
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import './Home.css'
import html2canvas from 'html2canvas';

const Home = () => {
  const [showUp, setShowup] = useState(false);
  const [showUpClicked, setShowupClicked] = useState(false);
  const [upCount, setUpCount] = useState(15);
  const [showDown, setShowDown] = useState(false);
  const [showDownClicked, setShowDownClicked] = useState(false);
  const [downCount, setDownCount] = useState(200);
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [bgcolor, setBgColor] = useState('#e6d084');
  const [displayMainColorPicker , setDisplayMainColorPicker] = useState(false);
  const [mainColor, setMainColor] = useState('#7a1e30');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const printRef = useRef();

  const quoteDetails = [
    {id: 0,tag:"#Success", quote:"Success is not final, failure is not fatal: it is the courage to continue that counts", by:"Winston Churchill"},
    {id: 1,tag:"#Motivation", quote:"Do what you can, with what you have, where you are.", by:"Theodore Roosevelt"},
    {id: 2,tag:"#Productivity", quote:"Don't count the days, make the days count.", by:"Muhammad Ali"},
    {id: 3,tag:"#Confidence",  quote:"Doubt kills more dreams than failure ever will.", by:"Suzy Kassem"}
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

    const handleBgColorClick = () => {
      setDisplayBgColorPicker(!displayBgColorPicker);
    }

    const handleBgColorClose = () => {
      setDisplayBgColorPicker(false);
    }

    const handleBgColorChange = (bgcolor) => {
      setBgColor(bgcolor.hex);
    }

    const handleMainColorClick = () => {
      setDisplayMainColorPicker(!displayMainColorPicker);
    }

    const handleMainColorClose = () => {
      setDisplayMainColorPicker(false);
    }

    const handleMainColorChange = (mainColor) => {
      setMainColor(mainColor.hex);
    }

    const handlePrev = () => {
      console.log("prev")
      setActiveIndex(activeIndex === 0 ? quoteDetails.length - 1 : activeIndex - 1)
    }

    const handleNext = () => {
      console.log("next")
      setActiveIndex(activeIndex === quoteDetails.length - 1 ? 0 : activeIndex + 1)
    }

    const handleDownloadImage = async () => {
       const canvas = await html2canvas(printRef.current,{allowTaint:true});
       const dataURL = canvas.toDataURL("image/png");

       const link = document.createElement('a');
       link.href = dataURL;
       link.download = "image.png";
       link.click();
    };

   const styles = {
    popover: {
      position: 'absolute',
      zIndex: '2',
      bottom:0,
    },
    cover: {
      position: 'fixed',
      bottom:0,
      top:0,
      left:0,
      right:0,
    },
   }

  return (
    <div className='home-container' style={{backgroundColor:`${bgcolor}`}}>
      <div className='home-quote'>
        <div className='home-quote-prev' style={{color: `${mainColor}`}} onClick={handlePrev} ><FaCaretLeft /></div>    
        {quoteDetails
          .map((quoteDetail,index) => (
               index === activeIndex &&
                <Quote
                  ref = {printRef}
                  style={{color:`${mainColor}`,backgroundColor:`${bgcolor}`}}
                  key={quoteDetail.id}
                  tag={quoteDetail.tag}
                  quote={quoteDetail.quote}
                  by={quoteDetail.by}
                />
        ))       
        }
        {/* <Quote details={quoteDetails} style={{color: `${mainColor}`}} */}
        <div className='home-quote-next' style={{color: `${mainColor}`}} onClick={handleNext}><FaCaretRight /></div>
      </div>
      <div className='home-footer' style={{color: `${mainColor}`}}>
        <div className='home-footer-vote-comment'>
          <div className='home-footer-vote'>
            <div className='home-footer-upvote icon' 
              style={{color: `${mainColor}`}}
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

            <div className='home-footer-downvote icon'
              style={{color: `${mainColor}`}}
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
          <div className='home-footer-comment icon' style={{color: `${mainColor}`}}>
            <FaComment />
            {"250"}
          </div>
        </div>
        <div className='home-footer-signup' style={{color: `${mainColor}`}}>
          <h2 className='home-footer-signup-request'>Would you like to write your own?</h2>
          <h2 className='home-footer-signup-btn'>Sign up</h2>
        </div>
        <div className='home-footer-color'>
          <div className='home-footer-color-background' style={{background:`${bgcolor}`}} onClick={handleBgColorClick}>
            {displayBgColorPicker ?
              <div style={styles.popover}>
              <div style={styles.cover} onClick={handleBgColorClose}/>
              <ChromePicker color={bgcolor} onChange={handleBgColorChange}/>
              </div> : null} 
             
          </div> {bgcolor}
          <div className='home-footer-color-text' style={{backgroundColor: `${mainColor}`}} onClick={handleMainColorClick}>
              {displayMainColorPicker ?
              <div style={styles.popover}>
              <div style={styles.cover} onClick={handleMainColorClose}/>
              <ChromePicker color={mainColor} onChange={handleMainColorChange}/>
              </div> : null} 
              
          </div>{mainColor}
        </div>
        <div className='home-footer-download icon' style={{color: `${mainColor}`}} onClick={handleDownloadImage}><FaDownload /></div>
      </div>

    </div>
  )
}

export default Home