import React from 'react';
import './MementoBoxInfo.css';

const MementoBoxInfo = () => {
  return (
    <div className='memento-box-info'>
      <div className='section'>
        <div className='columns'>
          <div className='left-column'>
            <h2>What's a Memento Box?</h2>
            <p>Memento is a collaboration platform for groups to put together digital “boxes” around celebrations for loved ones. Collect videos, photos, voice memos, playlists, and more to package into a digital box and send to someone.</p>
            <p>Memento is there for any occasion you want to celebrate - birthdays, anniversaries, weddings, retirements, you name it.</p>
          </div>
          <div className='right-column'>
            <img src="/RecipientBoxOpen.png" alt="Recipient Box" className="recipient-box-icon" />
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='columns'>
          <div className='left-column'>
            <img src="/boxes/WhiteBoxOpenGoldRibbon.png" alt="Memento Box" className="memento-box-icon" />
          </div>
          <div className='right-column'>
            <h2>What's “inside” a Memento Box?</h2>
            <p>Well... that's up to you! Memento Box supports the following features:</p>
            <ul>
              <li>
                <img src="/icons/video-player.png" alt="Video Compilation" className="icon" />
                Video compilation
              </li>
              <li>
                <img src="/icons/camera.png" alt="Photo Slideshow" className="icon" />
                Photo slideshow
              </li>
              <li>
                <img src="/icons/collaborate.png" alt="Collaborate with Others" className="icon" />
                Collaborate with others
              </li>
              <li>
                <img src="/icons/audio.png" alt="Audio Recordings" className="icon" />
                Audio recordings
              </li>
              <li>
                <img src="/icons/writing-hand.png" alt="Upload Handwritten Letters" className="icon" />
                Upload handwritten letters
              </li>
              <li>
                <img src="/icons/gift.png" alt="Add Collaborative Gifts" className="icon" />
                Add collaborative gifts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MementoBoxInfo;
