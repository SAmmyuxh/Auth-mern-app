import React from 'react'
import { handleerror, handlesuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Home() {
  const navigate = useNavigate();
  const [loggedinuser, setloggedinuser] = useState("")
  const [products, setproducts] = useState('')
  useEffect(() => {
    setloggedinuser(localStorage.getItem('loggedinuser'))
  }, [])
  const handlelogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedinuser');
    handlesuccess('User Logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  const fetchproducts = async ()=>{
   try {
    const headers = {
      headers:{
        'Authorization':localStorage.getItem("token")
      }
    }
    const url = "https://auth-mern-app-api-ashy.vercel.app/products"
    const response = await fetch(url,headers)
    const result = await response.json();
     setproducts(result)
   } catch (error) {
    handleerror(error)
   }
  } 
  useEffect(() => {
   fetchproducts()
  }, [])
  
  return (
    <div>
      <h1>{loggedinuser}</h1>
      <button onClick={handlelogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                {item.name}: {item.skill}
              </li>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
     
      <ToastContainer/>
    </div>
  )
}

export default Home
