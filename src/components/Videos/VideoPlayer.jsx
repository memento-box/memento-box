import cloudinary from 'cloudinary-video-player';
import "cloudinary-video-player/cld-video-player.min.css";

import { useEffect, useRef } from 'react';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const VideoPlayer = (props) => {
  const { width, height} = props;
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: cloudName
    })
  }, []);

  return (
      <video
        ref={videoRef}
        data-cld-public-id="cw9n0f90qtdjpg6v5awl"
        width={width}
        height={height}
        controls 
      />
  );
}

export default VideoPlayer;