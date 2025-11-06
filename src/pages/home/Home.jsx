import React, { useEffect, useRef, useState } from "react";
import Quote from "../../components/quote/Quote";
import { FaAnglesUp, FaCaretLeft } from "react-icons/fa6";
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
import {getService} from "/src/utils/httpServices.js"
import { HashLoader } from "react-spinners";

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
  const [quoteDetails, setQuoteDetails] = useState([])
  const [footerShow, setFooterShow] = useState(true)
  const [isLoading,setIsLoading] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    fetchQuotes();
    
  },[])


  const fetchQuotes = async() => {
    try {
      setIsLoading(true)
      const getDetails = await getService("http://localhost:1999/quotes/?writer&count")
      console.log(getDetails)
      setQuoteDetails(getDetails)
      setIsLoading(false)
      
    } catch (error) {
      console.log("error:",error)
    }
   
  }

  
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
        {isLoading && <HashLoader style={{color:"#7a1e30"}}/>}
        {/* map quote details from the object, download image ref, blur background while popups are shown */}
        {quoteDetails.map(
          (quoteDetail, index) =>
            index === activeIndex && (
              <Quote
                ref={printRef}
                style={(showSignupPopUp||showSuccessSignupPopup||showLoginPopup||showLoginSuccessPopup) ? 
                        {filter:'blur(10px)'} : 
                        {backgroundColor:`${getBgColor}`||"#e6d084", color: `${getTextColor}`||"#7a1e30"}
                      }
                key={quoteDetail.id}
                quote={quoteDetail.quote}
                by={quoteDetail.by}
                tag={quoteDetail.tags.map((tag,tagIndex)=> 
                  <div className="home-quote-tag" key={tagIndex}>{'#'+tag}</div> )}
              />
            )
        )}
        {/* see next quote  */}
        <div className="home-quote-next" onClick={handleNext}>
          <FaCaretRight />
        </div>
      </div>
        {/* mapping vote details, comment details, show popup warning while login or singup false  */}
      <div className="footer-transporter" style={{bottom: footerShow? 0 : '-15vh'}}>
        <div className="footer-toggle" onClick={() => setFooterShow(!footerShow)}>
          <FaAnglesUp style={{ transform: footerShow? 'rotateZ(180deg)' : 'rotateZ(0deg)' }}/>
        </div>
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
    </div>
  );
};

export default Home;
