import React, { useState, useEffect } from 'react';
import './RecipientPhotos.css';
import cameraIcon from '/icons/camera.png';

function RecipientPhotos({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoFiles = [
        'gardening1.jpg', 'gardening2.jpg', 'travel.jpg', 'travel2.jpg', 
        'turtle1.jpg', 'turtle2.jpg', 'turtle3.jpg', 'turtle4.jpg'
      ];
      const photoSenders = [
        'Fatima', 'Charlie', 'Guillermo', 'Sasha', 
        'Priyanka', 'Fatima', 'Charlie', 'Guillermo'
      ];
      const photoCaptions = [
        "Happy Birthday Casey! Gardening: where we get our hands dirty and our minds clean. - Fatima",
        "Casey, this is what happens when houseplants aren't enough for us. Happy Birthday! - Charlie",
        "Happy Birthday Casey! Greece was epic, but getting lost in Corfu was the highlight. - Guillermo",
        "The northern lights are even better outside of a video game. Happy Birthday, Casey! - Sasha",
        "Happy Birthday Casey! Remember when we helped those baby turtles find their way to the ocean? - Priyanka",
        "Casey, just us at the turtle sanctuary. Happy Birthday! - Fatima",
        "Swimming with sea turtles was unforgettable. Happy Birthday, Casey! - Charlie",
        "Turtle adventures with you are the best, Casey! Happy Birthday! - Guillermo"
      ];

      const fetchedPhotos = photoFiles.map((file, index) => ({
        sender: photoSenders[index],
        src: `/photos/${file}`,
        caption: photoCaptions[index]
      }));

      setPhotos(fetchedPhotos);
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="container">
      {selectedPhoto ? (
        <div className="photo-modal">
          <button className="back-link" onClick={() => setSelectedPhoto(null)}>Back</button>
          <div className="photo-wrapper">
            {isLoading && <p>Loading...</p>}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.sender}
              onLoad={handleImageLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
              className="photo-image"
            />
            <p className="photo-caption">{selectedPhoto.caption}</p>
          </div>
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="photos-heading">Photos</h1>
          <div className="photos-list-container">
            <div className="photos-list">
              {photos.map((photo, index) => (
                <div key={index} className="photo-item" onClick={() => handlePhotoClick(photo)}>
                  <img src={cameraIcon} alt="Camera icon" className="photo-icon" />
                  <span>{photo.sender} sent you a photo!</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientPhotos;
