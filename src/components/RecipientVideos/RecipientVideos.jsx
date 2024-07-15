import React, { useState, useEffect } from 'react';
import './RecipientVideos.css';
import videoIcon from '/icons/video-player.png'; // Adjust the path if necessary

function RecipientVideos({ onBack }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoFiles = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
      const videoSenders = ['Lons', 'Sarah', 'Sean', 'Zoe'];

      const fetchedVideos = await Promise.all(
        videoFiles.map(async (file, index) => {
          const response = await fetch(`/videos/${file}`);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return { sender: videoSenders[index], url };
        })
      );

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
        <div>
          <button className="back-link" onClick={() => setSelectedVideo(null)}>Back</button>
          <h1>Video from {selectedVideo.sender}</h1>
          <video controls>
            <source src={selectedVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
