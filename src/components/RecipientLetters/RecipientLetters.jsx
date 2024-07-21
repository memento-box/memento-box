import React, { useState, useEffect } from 'react';
import './RecipientLetters.css';
import letterIcon from '/icons/letter.png';

function RecipientLetters({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      const letterSenders = ['Fatima', 'Charlie', 'Guillermo', 'Sasha'];

      const letterContents = [
        "Dear Casey,\n\nHappy birthday! Remember that time we went hiking in the mountains and got completely lost? It was both terrifying and exhilarating. The view from the top was worth every bit of confusion and exhaustion. I hope this year brings you many more adventures like that one, filled with unexpected twists and beautiful surprises.\n\nVideo gaming has always been our go-to for a chill night in. Those late-night gaming sessions, full of laughter and friendly competition, are some of my favorite memories. May this year be filled with more epic gaming nights and high scores. Cheers to another fantastic year ahead!\n\nBest regards,\nFatima",
        "Dear Casey,\n\nWishing you a fantastic birthday! Our road trip last summer was unforgettable. From the spontaneous detours to the deep conversations during long drives, it was a journey I will always cherish. I hope this year gives you the chance to explore new places and create more wonderful memories on the road.\n\nGardening together in the community garden has been such a rewarding experience. Watching our plants grow and bloom has taught me so much about patience and care. I hope you continue to find joy and peace in your garden. Here's to many more sunny days spent among the flowers!\n\nSincerely,\nCharlie",
        "Dear Casey,\n\nHappy birthday! I still remember the excitement of our first international trip together. Navigating through foreign cities, trying new foods, and immersing ourselves in different cultures was an eye-opening experience. I hope you have many more opportunities to travel and discover the wonders of the world.\n\nOur shared love for turtles has always been a special bond. Remember the time we volunteered at the turtle rescue center? It was amazing to see these incredible creatures up close and contribute to their conservation. May your passion for turtles continue to grow and inspire others.\n\nWarm regards,\nGuillermo",
        "Dear Casey,\n\nCongratulations on another trip around the sun! Our backyard barbecues and gardening sessions are some of my fondest memories. There's something truly special about growing your own vegetables and then enjoying them with good company. I hope your garden continues to thrive and brings you joy throughout the year.\n\nOur movie marathons and game nights are legendary. From the intense board games to the hilarious movie choices, we've had countless nights of fun and laughter. I look forward to many more evenings filled with great entertainment and even better company. Happy birthday, Casey!\n\nBest wishes,\nSasha"
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
