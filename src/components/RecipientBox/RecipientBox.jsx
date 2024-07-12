import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import './RecipientBox.css';

function RecipientBox() {
    let [openBox, setOpenBox] = useState(false);
    let [greeting, setGreeting] = useState('Happy Birthday');
    let [collabs, setCollabs] = useState(['Lons', 'Sarah', 'Sean', 'Zoe']);

    useEffect(() => {

    }, [])


  return (
    <div id='grid'>
        <div id="collaborators">
        <h3 id='greeting'>{greeting}</h3>
        <h6 id='from'>From:</h6>
        {collabs.map((person) => 
            <p className='person' key={person}>{person}</p>
        )}
        </div>
        <img src='/RecipientBoxOpen.png' id='boxOpen' useMap='#image-map'/>
            <map name="image-map">
                <area target="" alt="Photos" title="Photos" href="" coords="89,71,249,303" shape="rect" />
                <area target="" alt="Videos" title="Videos" href="" coords="254,78,529,269" shape="rect" />
                <area target="" alt="Voice notes" title="Voice notes" href="" coords="270,352,540,274" shape="rect" />
                <area target="" alt="Gifts" title="Gifts" href="" coords="92,310,245,417" shape="rect" />
                <area target="" alt="Mixtape" title="Mixtape" href="" coords="80,422,262,537" shape="rect" />
                <area target="" alt="Letters" title="Letters" href="" coords="266,357,538,535" shape="rect" />
            </map>
      
        <img 
            src='/RecipientBoxClosed.png' 
            id='boxClosed' 
            onClick={() => setOpenBox(true)}
            className={openBox ? 'animation' : ''}
            />
    </div>
  );
}

export default RecipientBox;
