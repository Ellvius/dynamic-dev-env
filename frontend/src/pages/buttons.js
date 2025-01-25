import React from 'react'
import './buttons.css'
import axios from 'axios';


    const Card = ({ image, title, devName }) => {
      const handleClick = async (devName) => {
        try {
          const newTab = window.open("", "_blank");
          if (newTab) {
            newTab.document.write("<h1>Setting up your development environment...</h1>");
          }
      
          const response = await axios.get('http://localhost:5000/start-container',
           {params: { dev: devName }}
          );
      
          if (response.data.redirectUrl) {
            const url = response.data.redirectUrl;
      
                newTab.location.href = url;
          }
        } catch (error) {
          console.error("Error starting container:", error);
        }
      };

        return (
          <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
              <h3>{title}</h3>
            </div>
            <button className="card-button" onClick={()=>handleClick(devName)}>
              Set Up {title} Environment
            </button>
          </div>
        );
      };



export default function Buttons() {
  return (
      
  <div className='card-container'>
  
   <Card image="/images/node.png" title="Node.js" devName="node-dev"></Card>
   <Card image="/images/python.png" title="Python" devName="python-dev"></Card>
   <Card image="/images/cpp.png" title="CPP" devName="cpp-dev"></Card>
  </div>



  )
}
