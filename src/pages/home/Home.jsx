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
import Login from "../../components/login/Login";
import { IoMdLogOut } from "react-icons/io";
import { CiText } from "react-icons/ci";
import { TbBackground } from "react-icons/tb";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [getBgColor, setGetBgColor] = useState("");
  const [getTextColor, setGetTextColor] = useState("");
  const [showSignupPopUp , setShowSignupPopUp] = useState(false);
  const [showSuccessSignupPopup, setShowSuccessSignupPopup] = useState(false);
  const [signupStatus, setSignupStatus] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [getUsername, setGetUsername] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false)

  const printRef = useRef();

  const quoteDetails = [
    {
      id: 0,
      tags: ["#Success",],
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

  const handleGetUsername= (username) => {
    setGetUsername(username)
  }

  return (
    <div className="home-container" style={{ backgroundColor: `${getBgColor}` }} > 
      {/* while Clicking outside the popup the popup will close */}
      <div className="home-quote" onClick={()=>{
          (showSignupPopUp || showLoginPopup ||showWarningPopup) ? 
          (setShowSignupPopUp(false)||setShowLoginPopup(false)||setShowWarningPopup(false)):
          null
          }}
      > 
        {/* see previouse quote */}
        <div className="home-quote-prev" onClick={handlePrev}>
          <FaCaretLeft />
        </div>
        {/* map quote details from the object, download image ref, blur background while popups are shown */}
        {quoteDetails.map(
          (quoteDetail, index) =>
            index === activeIndex && (
              <Quote
                ref={printRef}
                style={(showSignupPopUp||showSuccessSignupPopup||showLoginPopup||showLoginSuccessPopup) ? 
                        {filter:'blur(10px)'} : 
                        {backgroundColor: `${getBgColor}`,color: `${getTextColor}`}
                      }
                key={quoteDetail.id}
                tag={quoteDetail.tag}
                quote={quoteDetail.quote}
                by={quoteDetail.by}
              />
            )
        )}
        {/* see next quote  */}
        <div className="home-quote-next" onClick={handleNext}>
          <FaCaretRight />
        </div>
      </div>
        {/* mapping vote details, comment details, show popup warning while login or singup false  */}
      <div className="home-footer" >
        <div className="home-footer-vote-comment">
          {quoteDetails.map(
            (quoteDetail, index) =>
              index === activeIndex && (
                <Vote
                  key={quoteDetail.id}
                  status={quoteDetail.status}
                  upcount={quoteDetail.upvote}
                  downcount={quoteDetail.downvote}
                  successStatus={loginStatus || signupStatus}
                  handleVoteClick={() => !showLoginPopup &&  setShowWarningPopup(true)}
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
                  successStatus={loginStatus || signupStatus}
                  handleCommentClick={() => !showLoginPopup && setShowWarningPopup(true)}
                />
              )
          )}
          {showWarningPopup &&
            <Popup 
              task={"To React this Quote"}
              label={"Login"}
              showPopup={showWarningPopup} 
              closePopup = {() => {
                  setShowWarningPopup(false); 
                  setShowLoginPopup(true);
                  console.log(showWarningPopup)
                }
              }   
              position={"fixed"}
              left={"90px"} 
              top={"400px"}        
            />
          }
        </div>
          {/* login section, show login popup and its functioanlities  */}
        <div className="home-footer-signup" >
          <h2 className="home-footer-signup-request">
            {(loginStatus||signupStatus) ? getUsername: "Would you like to write your own?"}            
          </h2>
          <button className="home-footer-signup-btn" 
            onClick={()=> {
              (!loginStatus&&!signupStatus) ? (setShowLoginPopup(true)): (setLoginStatus(false) || setSignupStatus(false));
              console.log(`login ${loginStatus}`)}
            } style={(loginStatus||signupStatus) ? {width:'30px',height:'30px',fontSize:'20px',paddingTop:'5px'}:null}>
            {(loginStatus||signupStatus) ? <IoMdLogOut />: "Log in"}
          </button>
          {/* signup popup  */}
          <Signup 
            showSignupPopUp={showSignupPopUp} 
            closeSignupPopUp={()=>setShowSignupPopUp(false)}
            isSignup = {() => {
              setShowSuccessSignupPopup(true);
              setShowSignupPopUp(false)
              setSignupStatus(true)
              }
            }
            sendUsername={handleGetUsername}
            getLoginPopup={() => {{setShowLoginPopup(true); setShowSignupPopUp(false)}}}
          />
          {/* login popup  */}
          <Login
            closeLoginPopup={() => setShowLoginPopup(false)}
            showLoginPopup={showLoginPopup}
            getSignupPopup={() => {setShowSignupPopUp(true); setShowLoginPopup(false)}}
            isLogin ={() => {
              setShowLoginSuccessPopup(true)
              setShowLoginPopup(false)
              setLoginStatus(true)
            }}
            sendUsername={handleGetUsername}
          />
          {/* success status popup  */}
          {(showSuccessSignupPopup || showLoginSuccessPopup) &&
            <Popup 
              task={(signupStatus && "Signup Success!") || (loginStatus && "Login Success")}
              label={"Close"}
              showPopup={()=>{(signupStatus && showSuccessSignupPopup)||(loginStatus && showLoginSuccessPopup)}}
              closePopup = {() => {
                setShowSuccessSignupPopup(false);
                setShowLoginSuccessPopup(false)
                console.log(showSuccessSignupPopup)
              }}            
            />
          }
        </div>
          {/* download image and color pickers  */}
        <div className="home-footer-download-color">
          <DownloadImage printRef={printRef} />
          <div className="color-picker">
            <ColorPicker sendColor = {handleGetBgColor} initialColor="#e6d084" iconLabel={<TbBackground />}/>
            <ColorPicker sendColor={handleTextColor} initialColor="#7a1e30" iconLabel={<CiText />}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
