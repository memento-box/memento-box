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
      const videoCaptions = [
        "Turtles communicate with each other using sounds and vibrations.",
        "Some turtles can live to be over 100 years old.",
        "Turtles are found on every continent except Antarctica.",
        "Leatherback sea turtles can weigh over 1,000 pounds."
      ];

      const fetchedVideos = videoFiles.map((file, index) => ({
        sender: videoSenders[index],
        file: file,
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
