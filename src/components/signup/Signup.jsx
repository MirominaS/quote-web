import React, { useState } from 'react'
import './Signup.css'
import Input from '../input/Input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const Signup = ({showSignupPopUp ,  closeSignupPopUp,isSignup,sendUsername,getLoginPopup}) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState({});
    
    

    const emailRegex = /@/

    const validation = () => {
        let error = {mail:"",uname:"",pswrd:""};
        let valid = true;
        if(!email){
            error.mail = "Email is required"
            setEmail("")
            valid = false;
        }else if(!emailRegex.test(email)){
            error.mail = "Invalid Email"
            setEmail("")
            valid = false;
        }
        if(!username.trim()){
            error.uname = "Username is required"
            setUsername("")
            valid = false;
        }else if(username.length < 5){
            error.uname = "Username should be atlest 6 charectors"
            setUsername("")
            valid = false;
        }
        if(!password.trim()){
            error.pswrd = "Password is required"
            setPassword("")
            valid = false;
        }else if(password.length < 8){
            error.pswrd = "Password should contain atleast 8 char"
            setPassword("")
            valid = false;
        }
        setError(error)
        return valid;
    }

    const handleValidation = () => {
        const validate = validation()
        let isSuccess = true
        if(validate){
          isSuccess=true
          setEmail("")
          setUsername("")
          setPassword("")
        }else{
          validation()
          isSuccess = false
        }
        // setDisplayMessage(message)
        return isSuccess;
    }
    const sigupSuccess = () => {
        const success = handleValidation()
        if(success){
            console.log("success")
            isSignup();
            
        }else{
            console.log("fail")
                      
        }
    }

    if(!showSignupPopUp) return null;

  return (
    <div className='signup-container'>
        <div className='signup-close-btn' onClick={()=>{ closeSignupPopUp(); setEmail(""); setUsername(""); setPassword(""); setError("")}}><IoClose /></div>
        <div className='signup-title'>Sign Up</div>
        <div className='signup-email'>
            <Input 
                type='text'
                placeholder="Email"
                maxWidth='400px'
                width='90%'
                height='35px'
                value={email}
                handleChange={(mail) => setEmail(mail.target.value)}
            />
            {error.mail && <span className='email-error-message'>{error.mail}</span>}
        </div>
        <div className='signup-username'>
            <Input
                type='text'
                placeholder="Username"
                maxWidth='400px'
                width='90%'
                height='35px'
                value={username}
                handleChange={(uname) => {setUsername(uname.target.value); sendUsername(uname.target.value)}}
            />
            {error.uname && <span className='username-error-message'>{error.uname}</span>}
        </div>
        <div className='signup-password'>
             <Input
                type={!showPassword ? "password" : "text"}
                placeholder="Password"
                maxWidth='400px'
                width='90%'
                height='35px'
                value={password}
                handleChange={(pwrd) => setPassword(pwrd.target.value)}
             />
             {error.pswrd && <span className='password-error-message'>{error.pswrd}</span>}
             <div className='signup-password-icon' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <FaEye /> :<FaEyeSlash /> }
             </div>
        </div>
        {/* <div className='signup-terms'>terms & conditions</div> */}
        <div className='signup-button'>
            <button onClick={sigupSuccess}>
                Sign Up
            </button>
        </div>
        <div className='signup-login'>
            <span>Already have an account?</span>
            <span onClick={getLoginPopup}>Login</span>
        </div>
    </div>
  )
}

export default Signup