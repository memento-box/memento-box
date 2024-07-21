import React, { useState, useEffect } from 'react';
import './RecipientVideos.css';
import videoIcon from '/icons/video-player.png';

function RecipientVideos({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = [
        'gardening1.mp4', 'gardening2.mp4', 'memento-Intro.mp4', 
        'travel1.mp4', 'travel2.mp4', 'turtle1.mp4', 
        'turtle2.mp4', 'turtle3.mp4', 'turtle4.mp4'
      ];
      const videoSenders = [
        'Fatima', 'Charlie', 'Guillermo', 'Sasha', 
        'Priyanka', 'David', 'Erik', 'Michael', 
        'Anna', 'John'
      ];
      const videoCaptions = [
        "Gardening brings peace to the mind.",
        "Gardening is a great way to relax.",
        "Introduction to our memento project.",
        "Traveling opens up new horizons.",
        "Exploring new places is fun.",
        "Turtles have existed for around 215 million years.",
        "A turtle's shell is made up of 50 bones fused together.",
        "Sea turtles can hold their breath for 5 hours underwater.",
        "Turtles can live for more than 100 years."
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
