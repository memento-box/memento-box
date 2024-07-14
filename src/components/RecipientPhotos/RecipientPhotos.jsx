import React, { useState, useEffect } from 'react';
import './RecipientPhotos.css';
import cameraIcon from '/icons/camera.png'; 

function RecipientPhotos({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoFiles = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];
      const photoSenders = ['Lons', 'Sarah', 'Sean', 'Zoe'];

      const fetchedPhotos = photoFiles.map((file, index) => {
        const url = `/photos/${file}`;
        return { sender: photoSenders[index], url };
      });

      setPhotos(fetchedPhotos);
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="container">
      {selectedPhoto ? (
        <div>
          <button className="back-link" onClick={() => setSelectedPhoto(null)}>Back</button>
          <h1>Photo from {selectedPhoto.sender}</h1>
          <img src={selectedPhoto.url} alt="Selected photo" />
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="photos-heading">Photos</h1>
          <div className="photos-list">
            {photos.map((photo, index) => (
              <div key={index} className="photo-item" onClick={() => handlePhotoClick(photo)}>
                <img src={cameraIcon} alt="Camera icon" className="photo-icon" />
                <span>{photo.sender} sent you a photo!</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientPhotos;
