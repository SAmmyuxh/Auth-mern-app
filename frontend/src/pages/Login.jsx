import React from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useState } from 'react'
import { handleerror, handlesuccess } from '../utils'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [logininfo, setlogininfo] = useState({
     email:"",
     password:""
   })
   const handlechange = (e)=>{
     const {name,value} = e.target;
     console.log(name,value)
     const copylogininfo = {...logininfo};
     copylogininfo[name] =value;
     setlogininfo(copylogininfo)
   }
 const handlelogin = async (e)=>{
   e.preventDefault();
   const{email,password}=logininfo;
   if(!email||!password){
     return handleerror(" email and password are required")
   }
   try {
     const url = "https://auth-mern-app-api-ashy.vercel.app/auth/login"
     const response = await fetch(url,
       {
         method:"POST",
         headers:{
           'Content-type':"application/json"
         },
         body:JSON.stringify(logininfo)
       }
     )
     const result = await response.json();
     const{success,message,jwttoken,name,error} = result
     if(success){
        handlesuccess(message)
        localStorage.setItem('token',jwttoken)
        localStorage.setItem('loggedinuser',name)
       setTimeout(() => {
         navigate('/home')
       }, 1000);
     }else if(error){
        const details = error?.details[0].message;
       
        handleerror(details)
         }else if(!success){
          
        handleerror(message)
       }
   } catch (err) {
     handleerror(err)
   }
 }

return (
<div className='container'>
  <form onSubmit={handlelogin} >
   <div>
     <label htmlFor='email'>Email</label>
     <input type='text' name='email' placeholder='Enter your email' autoFocus onChange={handlechange} value={logininfo.email}/>
   </div>
   <div>
     <label htmlFor='password'>Password</label>
     <input type='text' name='password' placeholder='Enter your password' autoFocus onChange={handlechange} value={logininfo.password}/>
   </div>
   <button>Login</button>
  <span>Do not have  an account?
   <Link to='/signup' >SignUp</Link>
  </span>
  </form>     
  <ToastContainer/>
</div>
)
}

export default Login
