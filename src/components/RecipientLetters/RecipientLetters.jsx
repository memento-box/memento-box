import React, { useState, useEffect } from 'react';
import './RecipientLetters.css';
import letterIcon from '/icons/letter.png';

function RecipientLetters({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      const letterSenders = ['David', 'Erik', 'Michael'];

      const letterContents = [
        "Dear friend, wishing you a fantastic birthday! - David",
        "Hope you have an amazing day! Happy Birthday! - Erik",
        "Sending you lots of love on your special day! - Michael"
      ];

      const fetchedLetters = letterSenders.map((sender, index) => ({
        sender: sender,
        text: letterContents[index]
      }));

      setLetters(fetchedLetters);
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
