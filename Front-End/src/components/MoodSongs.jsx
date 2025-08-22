import React, { useState, useRef } from 'react'
import "./MoodSongs.css"

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]); // store refs for all audio elements

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      // Pause current song
      audioRefs.current[index].pause();
      setIsPlaying(null);
    } else {
      // Pause any previously playing song
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause();
      }
      // Play new song
      audioRefs.current[index].play();
      setIsPlaying(index);
    }
  };

  return (
    <div className='mood-songs'>
      <h2>Recommended Songs</h2>
      {Songs.map((song, index) => (
        <div key={index} className="song-card">
          <div className='title'>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className='play-pause-button'>
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
            />
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i class="ri-pause-circle-fill"></i>
              ) : (
                <i class="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoodSongs
