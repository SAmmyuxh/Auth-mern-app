import React from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useState } from 'react'
import { handleerror, handlesuccess } from '../utils'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const navigate = useNavigate()
     const [signupinfo, setsignupinfo] = useState({
        name:"",
        email:"",
        password:""
      })
      const handlechange = (e)=>{
        const {name,value} = e.target;
        console.log(name,value)
        const copysignupinfo = {...signupinfo};
        copysignupinfo[name] =value;
        setsignupinfo(copysignupinfo)
      }
      console.log(signupinfo)
    const handleSignUp = async (e)=>{
      e.preventDefault();
      const{name,email,password}=signupinfo;
      if(!name||!email||!password){
        return handleerror("name email and password are required")
      }
      try {
        const url = "http://localhost:8080/auth/signup"
        const response = await fetch(url,
          {
            method:"POST",
            headers:{
              'Content-type':"application/json"
            },
            body:JSON.stringify(signupinfo)
          }
        )
        const result = await response.json();
        const{success,message,error} = result
        if(success){
           handlesuccess(message)
          setTimeout(() => {
            navigate('/login')
          }, 1000);
        }else if(error){
          const details = error?.details[0].message;
          handleerror(details)
        }else if(!success){
          handleerror(message)
        }
      } catch (error) {
        handleerror(error)
      }
    }
  
  return (
   <div className='container'>
     <form onSubmit={handleSignUp} >
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' placeholder='Enter your name' autoFocus onChange={handlechange}/>
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' placeholder='Enter your email' autoFocus onChange={handlechange}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='text' name='password' placeholder='Enter your password' autoFocus onChange={handlechange}/>
      </div>
      <button>SignUp</button>
     <span>Already have an account?
      <Link to='/login' >Login</Link>
     </span>
     </form>     
     <ToastContainer/>
   </div>
  )
}

export default Signup
