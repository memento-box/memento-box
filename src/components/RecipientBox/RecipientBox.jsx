// src/components/RecipientBox/RecipientBox.jsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RecipientBox.css';

function RecipientBox() {
    let [openBox, setOpenBox] = useState(false);
    let [greeting, setGreeting] = useState('Happy Birthday');
    let [collabs, setCollabs] = useState(['Lons', 'Sarah', 'Sean', 'Zoe']);

    const history = useHistory();

    const navigateTo = (path) => {
        history.push(path);
    };

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
                <area target="" alt="Photos" title="Photos" onClick={() => navigateTo('/recipient/photos')} coords="89,71,249,303" shape="rect" />
                <area target="" alt="Videos" title="Videos" onClick={() => navigateTo('/recipient/videos')} coords="254,78,529,269" shape="rect" />
                <area target="" alt="Voice notes" title="Voice notes" onClick={() => navigateTo('/recipient/voicenotes')} coords="270,352,540,274" shape="rect" />
                <area target="" alt="Gifts" title="Gifts" onClick={() => navigateTo('/recipient/gifts')} coords="92,310,245,417" shape="rect" />
                <area target="" alt="Mixtape" title="Mixtape" onClick={() => navigateTo('/recipient/mixtape')} coords="80,422,262,537" shape="rect" />
                <area target="" alt="Letters" title="Letters" onClick={() => navigateTo('/recipient/letters')} coords="266,357,538,535" shape="rect" />
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
