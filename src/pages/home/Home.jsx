import React, { useRef, useState } from "react";
import Quote from "../../components/quote/Quote";
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import "./Home.css";

import Vote from "../../components/vote/Vote";
import CommentQuote from "../../components/commentQuote/CommentQuote";
import DownloadImage from "../../components/downloadImage/DownloadImage";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import Signup from "../../components/signup/Signup";
import Popup from "../../components/Popup/Popup"

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [getBgColor, setGetBgColor] = useState("");
  const [getTextColor, setGetTextColor] = useState("");
  const [showSignupPopUp , setShowSignupPopUp] = useState(false);
  const [showSuccessSignupPopup, setShowSuccessSignupPopup] = useState(false);
  const [signupStatus, setSignupStatus] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false)

  const printRef = useRef();

  const quoteDetails = [
    {
      id: 0,
      tag: "#Success",
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts",
      by: "Winston Churchill",
      status: 0,
      upvote: 25,
      downvote: 10,
      commentCount: 15,
    },
    {
      id: 1,
      tag: "#Motivation",
      quote: "Do what you can, with what you have, where you are.",
      by: "Theodore Roosevelt",
      status: -1,
      upvote: 5,
      downvote: 1,
      commentCount: 25,
    },
    {
      id: 2,
      tag: "#Productivity",
      quote: "Don't count the days, make the days count.",
      by: "Muhammad Ali",
      status: 0,
      upvote: 29,
      downvote: 2,
      commentCount: 145,
    },
    {
      id: 3,
      tag: "#Confidence",
      quote: "Doubt kills more dreams than failure ever will.",
      by: "Suzy Kassem",
      status: -1,
      upvote: 48,
      downvote: 3,
      commentCount: 20,
    },
  ];

  const handleGetBgColor = (color) => {
    setGetBgColor(color);
  }


  const handleTextColor = (color) => {
    setGetTextColor(color)
  }

  const handlePrev = () => {
    console.log("prev");
    setActiveIndex(
      activeIndex === 0 ? quoteDetails.length - 1 : activeIndex - 1
    );
  };

  const handleNext = () => {
    console.log("next");
    setActiveIndex(
      activeIndex === quoteDetails.length - 1 ? 0 : activeIndex + 1
    );
  };
// onClick={()=>{(showSignupPopUp||showSuccessPopup) ? (setShowSignupPopUp(false),setShowSuccessPopup(false)):null}}
  return (
    <div className="home-container" style={{ backgroundColor: `${getBgColor}` }} >
      <div className="home-quote">
        <div className="home-quote-prev" onClick={handlePrev}>
          <FaCaretLeft />
        </div>
        {quoteDetails.map(
          (quoteDetail, index) =>
            index === activeIndex && (
              <Quote
                ref={printRef}
                style={(showSignupPopUp||showSuccessSignupPopup) ? {filter:'blur(10px)'} : {backgroundColor: `${getBgColor}`,color: `${getTextColor}`}}
                key={quoteDetail.id}
                tag={quoteDetail.tag}
                quote={quoteDetail.quote}
                by={quoteDetail.by}
              />
            )
        )}

        <div className="home-quote-next" onClick={handleNext}>
          <FaCaretRight />
        </div>
      </div>

      <div className="home-footer" style={{ color: `${getTextColor}` }}>
        <div className="home-footer-vote-comment">
          {quoteDetails.map(
            (quoteDetail, index) =>
              index === activeIndex && (
                <Vote
                  key={quoteDetail.id}
                  status={quoteDetail.status}
                  upcount={quoteDetail.upvote}
                  downcount={quoteDetail.downvote}
                  successStatus={signupStatus}
                  handleVoteClick={() =>  setShowWarningPopup(true)}
                />
              )
            )
          }
          {quoteDetails.map(
            (quoteDetail, index) =>
              index === activeIndex && (
                <CommentQuote
                  key={quoteDetail.id}
                  count={quoteDetail.commentCount}
                  successStatus={signupStatus}
                  handleCommentClick={() =>  setShowWarningPopup(true)}
                />
              )
          )}
          {showWarningPopup &&
            <Popup 
              task={"To React this Quote"}
              label={"Signup"}
              showPopup={showWarningPopup} 
              closePopup = {() => {setShowWarningPopup(false); setShowSignupPopUp(true);console.log(showWarningPopup)}}   
              position={"fixed"}
              left={"90px"} 
              top={"400px"}        
            />
          }
        </div>
        <div className="home-footer-signup" >
          <h2 className="home-footer-signup-request">
            Would you like to write your own?
          </h2>
          <h2 className="home-footer-signup-btn" onClick={()=> setShowSignupPopUp(true)}>Sign up</h2>
          <Signup 
            showSignupPopUp={showSignupPopUp} 
            closeSignupPopUp={()=>setShowSignupPopUp(false)}
            isSignup = {() => {
              setShowSuccessSignupPopup(true);
              setShowSignupPopUp(false)
              setSignupStatus(true)
              }
            }
          />
          {showSuccessSignupPopup && 
            <Popup 
              task={"Signup Success!"}
              label={"Close"}
              showPopup={showSuccessSignupPopup} 
              closePopup = {() => {setShowSuccessSignupPopup(false);console.log(showSuccessSignupPopup)}}            
            />
          }
        </div>

        <div className="home-footer-download-color">
          <DownloadImage printRef={printRef} />
          <div className="color-picker">
            <ColorPicker sendColor = {handleGetBgColor} initialColor="#e6d084"/>
            <ColorPicker sendColor={handleTextColor} initialColor="#7a1e30"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
