import React, { useState, useEffect } from 'react';
import './RecipientVideos.css';
import videoIcon from '/icons/video-player.png'; // Adjust the path if necessary

function RecipientVideos({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoFiles = [
    { file: 'video1.mp4', sender: 'Lons', caption: "Tortoises can live over 150 years. Happy Birthday!" },
    { file: 'video2.mp4', sender: 'Sarah', caption: "Some turtles can breathe through their butts. Happy Birthday!" },
    { file: 'video3.mp4', sender: 'Sean', caption: "Turtles can feel through their shells. Happy Birthday!" },
    { file: 'video4.mp4', sender: 'Zoe', caption: "Turtles are one of the oldest reptile groups. Happy Birthday!" }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container">
      {selectedVideo ? (
        <div className="video-modal">
          <button className="back-link" onClick={() => setSelectedVideo(null)}>Back</button>
          <h1>Video from {selectedVideo.sender}</h1>
          <div className="video-container">
            <video controls>
              <source src={`/videos/${selectedVideo.file}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-caption">{`${selectedVideo.caption} - ${selectedVideo.sender}`}</p>
          </div>
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="videos-heading">Videos</h1>
          <div className="videos-list">
            {videoFiles.map((video, index) => (
              <div key={index} className="video-item" onClick={() => handleVideoClick(video)}>
                <img src={videoIcon} alt="Video icon" className="video-icon" />
                <span>{video.sender} sent you a video!</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientVideos;
