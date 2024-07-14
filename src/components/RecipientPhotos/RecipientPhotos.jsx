import React, { useState, useEffect } from 'react';
import './RecipientPhotos.css';
import cameraIcon from '/icons/camera.png'; // Adjust the path if necessary

function RecipientPhotos({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoFiles = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];
      const photoTitles = ['Photo from Lons', 'Photo from Sarah', 'Photo from Sean', 'Photo from Zoe'];

      const fetchedPhotos = photoFiles.map((file, index) => ({
        title: photoTitles[index],
        src: `/photos/${file}`
      }));

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
        <div className="photo-modal">
          <button className="back-link" onClick={() => setSelectedPhoto(null)}>Back</button>
          <h1>{selectedPhoto.title}</h1>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.title}
            style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
          />
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="photos-heading">Photos</h1>
          <div className="photos-list">
            {photos.map((photo, index) => (
              <div key={index} className="photo-item" onClick={() => handlePhotoClick(photo)}>
                <img src={cameraIcon} alt="Camera icon" className="photo-icon" />
                <span>{photo.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientPhotos;
