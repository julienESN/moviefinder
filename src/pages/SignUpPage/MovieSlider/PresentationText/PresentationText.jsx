import React from 'react';

export default function PresentationText({
  currentMovie,
  currentMovieIndex,
  presentationTexts,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '25%',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '3vh',
        transition: 'opacity 1s',
        opacity: currentMovie ? 1 : 0,
      }}
    >
      {presentationTexts[currentMovieIndex]}
    </div>
  );
}
