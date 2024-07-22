import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import RecipientPhotos from '../RecipientPhotos/RecipientPhotos';
import RecipientVideos from '../RecipientVideos/RecipientVideos';
import RecipientVoiceNotes from '../RecipientVoiceNotes/RecipientVoiceNotes';
import RecipientGifts from '../RecipientGifts/RecipientGifts';
import RecipientMixtape from '../RecipientMixtape/RecipientMixtape';
import RecipientLetters from '../RecipientLetters/RecipientLetters';
import { useHistory, useParams } from 'react-router-dom';
import './RecipientBox.css';

Modal.setAppElement('#react-root');

function RecipientBox() {
  const [openBox, setOpenBox] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [greeting, setGreeting] = useState('Happy Birthday');
  const [collabs, setCollabs] = useState(['Fatima', 'Charlie', 'Guillermo', 'Sasha', 'Priyanka']);
  const history = useHistory();
  const { id } = useParams();

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

  const handleImageMapClick = (event, content) => {
    event.preventDefault();
    openModal(content);
  };

  const thanksClick = () => {
    history.push(`/thankyou/${id}`);
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
        <area alt="Photos" title="Photos" href="#" onClick={(event) => handleImageMapClick(event, <RecipientPhotos onBack={closeModal} />)} coords="89,71,249,303" shape="rect" />
        <area alt="Videos" title="Videos" href="#" onClick={(event) => handleImageMapClick(event, <RecipientVideos onBack={closeModal} />)} coords="254,78,529,269" shape="rect" />
        <area alt="Voice notes" title="Voice notes" href="#" onClick={(event) => handleImageMapClick(event, <RecipientVoiceNotes onBack={closeModal} />)} coords="270,352,540,274" shape="rect" />
        <area alt="Gifts" title="Gifts" href="#" onClick={(event) => handleImageMapClick(event, <RecipientGifts onBack={closeModal} />)} coords="92,310,245,417" shape="rect" />
        <area alt="Mixtape" title="Mixtape" href="#" onClick={(event) => handleImageMapClick(event, <RecipientMixtape onBack={closeModal} />)} coords="80,422,262,537" shape="rect" />
        <area alt="Letters" title="Letters" href="#" onClick={(event) => handleImageMapClick(event, <RecipientLetters onBack={closeModal} />)} coords="266,357,538,535" shape="rect" />
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
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'hidden',
            padding: '20px',
            border: '1px solid #ccc',
            background: '#fff',
          },
        }}
      >
        {modalContent}
      </Modal>
      <div id='thanks'>
        <p onClick={thanksClick}>Say thank you</p>
      </div>
    </div>
  );
}

export default RecipientBox;
