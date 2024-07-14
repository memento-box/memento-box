import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import RecipientPhotos from '../RecipientPhotos/RecipientPhotos';
import RecipientVideos from '../RecipientVideos/RecipientVideos';
import RecipientVoiceNotes from '../RecipientVoiceNotes/RecipientVoiceNotes';
import RecipientGifts from '../RecipientGifts/RecipientGifts';
import RecipientMixtape from '../RecipientMixtape/RecipientMixtape';
import RecipientLetters from '../RecipientLetters/RecipientLetters';
import './RecipientBox.css';

Modal.setAppElement('#react-root'); // Ensure this matches your root element ID

function RecipientBox() {
    const [openBox, setOpenBox] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [greeting, setGreeting] = useState('Happy Birthday');
    const [collabs, setCollabs] = useState(['Lons', 'Sarah', 'Sean', 'Zoe']);

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent(null);
    };

    useEffect(() => {
        // Any additional setup can go here
    }, []);

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
                <area alt="Photos" title="Photos" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientPhotos />); }} coords="89,71,249,303" shape="rect" />
                <area alt="Videos" title="Videos" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientVideos />); }} coords="254,78,529,269" shape="rect" />
                <area alt="Voice notes" title="Voice notes" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientVoiceNotes />); }} coords="270,352,540,274" shape="rect" />
                <area alt="Gifts" title="Gifts" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientGifts />); }} coords="92,310,245,417" shape="rect" />
                <area alt="Mixtape" title="Mixtape" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientMixtape />); }} coords="80,422,262,537" shape="rect" />
                <area alt="Letters" title="Letters" href="#" onClick={(e) => { e.preventDefault(); openModal(<RecipientLetters />); }} coords="266,357,538,535" shape="rect" />
            </map>
            <img 
                src='/RecipientBoxClosed.png' 
                id='boxClosed' 
                onClick={() => setOpenBox(true)}
                className={openBox ? 'animation' : ''}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Recipient Box Modal"
            >
                {modalContent}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default RecipientBox;
