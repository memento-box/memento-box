import React from 'react';
import { useHistory } from 'react-router-dom';
import { IoArrowForwardCircle } from 'react-icons/io5'; // Import the icon
import './Occasions.css';

const occasions = [
  { name: 'Birthday', color: '#95D2B3' }, 
  { name: 'Wedding', color: '#F5B7B1' }, 
  { name: 'Anniversary', color: '#D5AAFF' }, 
  { name: 'Graduation', color: '#96C9F4' }, 
  { name: 'Get Well Soon', color: '#A9DFBF' }, 
  { name: 'Thank You', color: '#F9E79F' }, 
  { name: 'Retirement', color: '#FFD700' }, 
  { name: 'In Memory Of', color: '#BDC3C7' }, 
  { name: 'New Baby', color: '#FAD0C0' }, 
];

function Occasions() {
  const history = useHistory();

  const handleGetStarted = () => {
    history.push("/box-setup-information");
  };

  return (
    <div className="occasions-container">
      {occasions.map((occasion, index) => (
        <div
          key={index}
          className="occasion-card"
          style={{ backgroundColor: occasion.color }}
          onClick={handleGetStarted}
        >
          <h3 className="occasion-title">{occasion.name}</h3>
          <div className="get-started-container">
            <span className="get-started-text">Get Started!</span>
            <IoArrowForwardCircle className="get-started-icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Occasions;
