import React, { useState } from 'react';
import './RecipientLetters.css';

const letters = [
  { sender: 'Lons', file: '/letters/letter1.txt' },
  { sender: 'Sarah', file: '/letters/letter2.txt' },
  { sender: 'Sean', file: '/letters/letter3.txt' },
  { sender: 'Zoe', file: '/letters/letter4.txt' }
];

function RecipientLetters() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letterContent, setLetterContent] = useState('');

  const fetchLetterContent = async (file) => {
    const response = await fetch(file);
    const text = await response.text();
    setLetterContent(text);
  };

  const handleLetterClick = (letter) => {
    fetchLetterContent(letter.file);
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
    setLetterContent('');
  };

  return (
    <div className="container">
      <h1>Letters</h1>
      {selectedLetter ? (
        <div>
          <h2>{selectedLetter.sender} sent you a letter!</h2>
          <p>{letterContent}</p>
          <button onClick={closeLetter}>Close</button>
        </div>
      ) : (
        <ul>
          {letters.map((letter, index) => (
            <li key={index} onClick={() => handleLetterClick(letter)}>
              <img src="/icons/letter.png" alt="Letter icon" className="icon" />
              {letter.sender} sent you a letter!
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipientLetters;
