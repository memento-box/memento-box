import React, { useState, useEffect } from 'react';
import './RecipientVideos.css';
import videoIcon from '/icons/video-player.png';

function RecipientVideos({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = ['video1.mp4', 'video2.mp4', 'video3.mp4'];
      const videoSenders = ['David', 'Erik', 'Michael'];
      const videoCaptions = [
        "Tortoises can live over 100 years. Happy Birthday!",
        "There are over 300 species of turtles. Happy Birthday!",
        "Turtles are reptiles. Happy Birthday!"
      ];

      const fetchedVideos = videoFiles.map((file, index) => ({
        sender: videoSenders[index],
        file: `/videos/${file}`,
        caption: videoCaptions[index]
      }));

      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, []);

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
              <source src={selectedVideo.file} type="video/mp4" />
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
            {videos.map((video, index) => (
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
