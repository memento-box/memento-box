import React, { useState, useEffect } from 'react';
import './RecipientLetters.css';
import letterIcon from '/icons/letter.png';

function RecipientLetters({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      const letterFiles = ['letter1.txt', 'letter2.txt', 'letter3.txt', 'letter4.txt'];
      const letterSenders = ['Fatima', 'Charlie', 'Guillermo', 'Sasha'];

      const letterPromises = letterFiles.map((file, index) =>
        fetch(`/letters/${file}`)
          .then(response => response.text())
          .then(text => ({
            sender: letterSenders[index],
            text: text,
          }))
      );

      const letterContents = await Promise.all(letterPromises);
      setLetters(letterContents);
    };

    fetchLetters();
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="container">
      {selectedLetter ? (
        <div>
          <button className="back-link" onClick={() => setSelectedLetter(null)}>Back</button>
          <h1>Letter from {selectedLetter.sender}</h1>
          <p>{selectedLetter.text}</p>
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="letters-heading">Letters</h1>
          <div className="letters-list">
            {letters.map((letter, index) => (
              <div key={index} className="letter-item" onClick={() => handleLetterClick(letter)}>
                <img src={letterIcon} alt="Letter icon" className="letter-icon" />
                <span>{letter.sender} sent you a letter!</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientLetters;
