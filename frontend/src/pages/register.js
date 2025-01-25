  import React from 'react'
  import { useState } from 'react';
  import './register.css'
  export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e)=>
    {
      e.preventDefault();

      if (password !== confirmpassword) {
        setError('Passwords do not match');
        alert("Passwords Do not Match");  
      } else {
        setError('');
        // Continue with the form submission logic
        console.log('Form submitted');
      }

    };

    return (
      <div className='regcontainer'> 
    
      <div className='regcard'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='inputgroups'>
          <label>Username</label>
          <input type="name" placeholder='Enter your Username' value={username} required
          onChange={ (e)=>setUsername(e.target.value) }></input>
        </div>

        <div className='inputgroups'>
          <label>Password</label>
          <input type="password" placeholder='Enter Password' value={password} 
          onChange={ (e)=>setPassword(e.target.value) }
          required></input>
        </div>

        <div className='inputgroups'>
          <label>Confirm Password</label>
          <input type="password" placeholder='Enter Password' value={confirmpassword} required
          onChange={(e)=>setConfirmPassword(e.target.value)}></input>
        </div>


        <button>Sign Up</button>
      </form>
      
      
      </div>



    </div>
    )
  }
