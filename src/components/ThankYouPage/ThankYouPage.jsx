import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './ThankYouPage.css';

function ThankYouPage() {
    let [collabs, setCollabs] = useState(['Lons', 'Sarah', 'Sean', 'Zoe']);
    let [message, setMessage] = useState();
    let [receivers, setReceivers] = useState([]);
    let [selectAll, setSelectAll] = useState(false);

    function handleSubmit(event) {
        event.preventDefault;
        console.log(message);
    }

    if(selectAll) {

    }

  return (
    <div id='pageGrid'>
        <h1 id='heading'>Give Thanks!</h1>
        <h4 id='messageTitle'>Send a message</h4>
        <form id='messageForm' onSubmit={(e) => handleSubmit(e)}>
            <textarea id='message' onChange={(event) => setMessage(event.target.value)}/>
            <div>
            <input type='checkbox' id='selectAll' />
            <label>Select All</label>
            {collabs.map((person) => 
            <div key={person}>
                <input className='collaborator' type='checkbox' checked={isChecked} /> 
                <label>{person}</label>
            </div>
            )}
            </div> 
            <input type='submit' value='Send'/>
        </form>
    </div>
  );
}

export default ThankYouPage;
