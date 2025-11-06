import React, { useState } from 'react'
import './Signup.css'
import Input from '../input/Input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { postService } from '../../utils/httpServices';


const Signup = ({showSignupPopUp ,  closeSignupPopUp,isSignup,sendUsername,getLoginPopup}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState({});
    const [userDetail,setUserDetail] = useState({email:"",username:"",password:""})


    const signupUser = async(userData) => {   
      const {success} = await postService('http://localhost:1999/quotes/user',userData)
    }
  

    const emailRegex = /@/

    const validation = () => {
        let error = {mail:"",uname:"",pswrd:""};
        let valid = true;
        if(!userDetail.email){
            error.mail = "Email is required"
            setUserDetail({email:""})
            valid = false;
        }else if(!emailRegex.test(userDetail.email)){
            error.mail = "Invalid Email"
            setUserDetail({email:""})
            valid = false;
        }
        if(!userDetail.username.trim()){
            error.uname = "Username is required"
            setUserDetail({username:""})
            valid = false;
        }else if(userDetail.username.length < 5){
            error.uname = "Username should be atlest 6 charectors"
            setUserDetail({username:""})
            valid = false;
        }
        if(!userDetail.password.trim()){
            error.pswrd = "Password is required"
            setUserDetail({password:""})
            valid = false;
        }else if(userDetail.password.length < 8){
            error.pswrd = "Password should contain atleast 8 char"
            setUserDetail({password:""})
            valid = false;
        }
        setError(error)
        return valid;        
    }

    const handleValidation = async() => {
        const validate = validation()
        let isSuccess = true
        if(validate){
            const userData = {
                email:userDetail.email,
                username:userDetail.username,
                password:userDetail.password
            }
            await signupUser(userData)
            isSignup()
            isSuccess=true
            setUserDetail({email:"",username:"",password:""})
        }else{
          validation()
          isSuccess = false
        }
        
        return isSuccess;
    }
    const sigupSuccess = () => {
        const success = handleValidation()
        if(success){
            console.log("signup success")
            isSignup();            
        }else{
            console.log("signup fail")                      
        }
    }

    const closeButton = () => {
        closeSignupPopUp()
        setUserDetail({email:"",username:"",password:""}) 
        setError("")
    }

    if(!showSignupPopUp) return null;

  return (
    <div className='signup-container'>
        <div className='signup-close-btn' onClick={closeButton}><IoClose /></div>
        <div className='signup-title'>Sign Up</div>
        <div className='signup-email'>
            <Input 
                type='text'
                placeholder="Email"
                maxWidth='400px'
                width='90%'
                height='35px'
                border={error.mail && '1px solid red'}
                value={userDetail.email}
                handleChange={(mail) => setUserDetail(prev => ({...prev,email:mail.target.value}))}
            />
            {error.mail && <span className='error-message'>{error.mail}</span>}
        </div>
        <div className='signup-username'>
            <Input
                type='text'
                placeholder="Username"
                maxWidth='400px'
                width='90%'
                height='35px'
                border={error.uname && '1px solid red'}
                value={userDetail.username}
                handleChange={(uname) => {setUserDetail(prev => ({...prev,username:uname.target.value})); sendUsername(uname.target.value)}}
            />
            {error.uname && <span className='error-message'>{error.uname}</span>}
        </div>
        <div className='signup-password'>
             <Input
                type={!showPassword ? "password" : "text"}
                placeholder="Password"
                maxWidth='400px'
                width='90%'
                height='35px'
                border={error.pswrd && '1px solid red'}
                value={userDetail.password}
                handleChange={(pwrd) => setUserDetail(prev => ({...prev,password:pwrd.target.value}))}
             />
             {error.pswrd && <span className='error-message'>{error.pswrd}</span>}
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
            <span className='signup-login-btn' onClick={getLoginPopup}>Login</span>
        </div>
    </div>
  )
}

export default Signup