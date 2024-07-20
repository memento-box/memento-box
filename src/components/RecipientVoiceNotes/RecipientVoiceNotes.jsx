import React, { useState, useEffect } from 'react';
import './RecipientVoiceNotes.css';
import audioIcon from '/icons/audio.png';

function RecipientVoiceNotes({ onBack }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [voiceNotes, setVoiceNotes] = useState([]);

  useEffect(() => {
    const fetchVoiceNotes = async () => {
      const noteFiles = ['note1.mp3', 'note2.mp3', 'note3.mp3'];
      const noteSenders = ['David', 'Erik', 'Michael'];

      const fetchedNotes = noteFiles.map((file, index) => {
        return { sender: noteSenders[index], file };
      });

      setVoiceNotes(fetchedNotes);
    };

    fetchVoiceNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="container">
      {selectedNote ? (
        <div>
          <button className="back-link" onClick={() => setSelectedNote(null)}>Back</button>
          <h1>Voice Note from {selectedNote.sender}</h1>
          <audio controls>
            <source src={`/voice-notes/${selectedNote.file}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="notes-heading">Voice Notes</h1>
          <div className="notes-list">
            {voiceNotes.map((note, index) => (
              <div key={index} className="note-item" onClick={() => handleNoteClick(note)}>
                <img src={audioIcon} alt="Audio icon" className="note-icon" />
                <span>{note.sender} sent you a voice note!</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientVoiceNotes;
