import React from 'react';

const LiveMatch = () => {
  return (
    <div
      style={{
        width: '100%', // Full width of the page
        height: '60vh', // Adjust as per design
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src="https://tmsbd.top/tt/play.php?id=370"
        title="Live Match"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default LiveMatch;
