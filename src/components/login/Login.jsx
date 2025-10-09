import React, { useState } from 'react'
import './Login.css'
import Input from '../input/Input'
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = ({showLoginPopup,closeLoginPopup,getSignupPopup,isLogin,sendUsername}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState({});

    const validation = () => {
        let error = {uname:"",pswrd:""};
        let valid = true;
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

    if(!showLoginPopup) return null;

    const handleValidation = () => {
        const validate = validation()
        let isSuccess = true
        if(validate){
          isSuccess=true
          setUsername("")
          setPassword("")
        }else{
          validation()
          isSuccess = false
        }
        return isSuccess;
    }
    const loginSuccess = () => {
        const success = handleValidation()
        if(success){
            console.log("success")
            isLogin();            
        }else{
            console.log("fail")                      
        }
    }


  return (
    <div className='login-container'>
        <div className='login-close-btn'  onClick={()=>{ closeLoginPopup(); setUsername(""); setPassword(""); setError("")}}><IoClose /></div>
        <div className='login-title'>Log In</div>
        <div className='login-username'>
            <Input
                type='text'
                placeholder="Username"
                maxWidth='400px'
                width='90%'
                height='35px'
                border={error.uname && '1px solid red'}
                value={username}
                handleChange={(uname) => {setUsername(uname.target.value);  sendUsername(uname.target.value) }}
                //
            />
            {error.uname && <span className='error-message'>{error.uname}</span>}
        </div>
        <div className='login-password'>
             <Input
                type={!showPassword ? "password" : "text"}
                placeholder="Password"
                maxWidth='400px'
                width='90%'
                height='35px'
                border={error.pswrd && '1px solid red'}
                value={password}
                handleChange={(pwrd) => setPassword(pwrd.target.value)}                
             />
            {error.pswrd && <span className='error-message'>{error.pswrd}</span>}
            <div className='login-password-icon' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?  <FaEye /> :<FaEyeSlash /> }
            </div>
        </div>
        <div className='login-forget-password'>Forget Password?</div>
        <div className='login-button'><button onClick={loginSuccess}>Log in</button></div>
        <div className='login-signup'>
            <span>Do not have an Accout?</span>
            <span className='login-signup-btn' onClick={getSignupPopup}>Sign up</span>
        </div>
        
    </div>
  )
}

export default Login