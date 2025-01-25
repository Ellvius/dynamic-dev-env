import React from 'react'
import './buttons.css'



    const Card = ({ image, title, onButtonClick }) => {
        return (
          <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
              <h3>{title}</h3>
            </div>
            <button className="card-button" onClick={onButtonClick}>
              Set Up {title} Environment
            </button>
          </div>
        );
      };



export default function Buttons() {
  return (
      
  <div className='card-container'>
  
   <Card image="/images/node.png" title="Node.js"></Card>
   <Card image="/images/python.png" title="Python"></Card>
   <Card image="/images/cpp.png" title="CPP"></Card>
  </div>



  )
}
