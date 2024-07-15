import React, { useState, useEffect } from 'react';
import './RecipientPhotos.css';
import cameraIcon from '/icons/camera.png'; // Adjust the path if necessary

function RecipientPhotos({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoFiles = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];
      const photoSenders = ['Lons', 'Sarah', 'Sean', 'Zoe'];
      const photoCaptions = [
        "Turtles have existed for around 215 million years. Happy Birthday!",
        "A turtle's shell is made up of 50 bones fused together. Happy Birthday!",
        "Sea turtles can hold their breath for 5 hours underwater. Happy Birthday!",
        "Turtles have excellent night vision. Happy Birthday!"
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

  const handleImageLoad = (event) => {
    setIsLoading(false);
    const img = event.target;
    console.log(`Image from ${selectedPhoto.sender} loaded: ${img.naturalWidth}x${img.naturalHeight}`);
    const caption = document.getElementById(`caption-${selectedPhoto.sender}`);
    if (caption) {
      console.log(`Caption for ${selectedPhoto.sender} is now visible`);
      caption.style.display = 'block';
    }
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
            <p id={`caption-${selectedPhoto.sender}`} className="photo-caption">{`${selectedPhoto.caption} - ${selectedPhoto.sender}`}</p>
          </div>
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
