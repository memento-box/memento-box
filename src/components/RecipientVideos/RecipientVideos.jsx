import React, { useState, useEffect } from 'react';
import './RecipientVideos.css';
import videoIcon from '/icons/video-player.png';

function RecipientVideos({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = [
        'gardening1.mp4', 'gardening2.mp4', 'travel1.mp4', 
        'travel2.mp4', 'turtle1.mp4', 'turtle2.mp4', 
        'turtle3.mp4', 'turtle4.mp4'
      ];
      const videoSenders = [
        'Fatima', 'Charlie', 'Guillermo', 'Sasha', 
        'Priyanka', 'Fatima', 'Charlie', 'Guillermo'
      ];

      const fetchedVideos = videoFiles.map((file, index) => ({
        sender: videoSenders[index],
        file: `/videos/${file}`
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
          <div className="video-wrapper">
            <div className="video-container">
              <video controls>
                <source src={selectedVideo.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="video-sender">From {selectedVideo.sender}</p>
          </div>
        </div>
      ) : (
        <div>
          <a className="back-link" onClick={onBack}>Back</a>
          <h1 className="videos-heading">Videos</h1>
          <div className="videos-list-container">
            <div className="videos-list">
              {videos.map((video, index) => (
                <div key={index} className="video-item" onClick={() => handleVideoClick(video)}>
                  <img src={videoIcon} alt="Video icon" className="video-icon" />
                  <span>{video.sender} sent you a video!</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipientVideos;
