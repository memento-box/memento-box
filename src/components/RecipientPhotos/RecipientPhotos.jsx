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
        'Priyanka', 'David', 'Erik', 'Michael'
      ];
      const photoCaptions = [
        "Gardening brings peace to the mind. - Fatima",
        "Gardening is a tranquil activity. - Charlie",
        "Travel broadens the mind. - Guillermo",
        "Travel brings new experiences. - Sasha",
        "Turtles have existed for around 215 million years. - Priyanka",
        "A turtle's shell is made up of 50 bones fused together. - David",
        "Sea turtles can hold their breath for 5 hours underwater. - Erik",
        "Turtles can live for more than 100 years. - Michael"
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
