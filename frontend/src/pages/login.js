import React from 'react'
import './login.css'

export default function Login({username,password}) {
  return (

   <div className='logincontainer'> 
   
    <div className='logincard'>
    <h2>Login</h2>
    <form>
       <div className='inputgroups'>
         <label>Username</label>
         <input type="name" placeholder='Enter your Username' value={username} required></input>
       </div>

       <div className='inputgroups'>
         <label>Password</label>
         <input type="password" placeholder='Enter Password' value={password} required></input>
       </div>


       <button>Login</button>
    </form>
    
    
    </div>



   </div>




  )}