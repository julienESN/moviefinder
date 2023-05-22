import React from 'react';

export default function MovieIndicator({
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
}) {
  return (
    <div
      key={index}
      onClick={() => setCurrentMovieIndex(index)}
      style={{
        height: '0.4vw',
        width: '70px',
        backgroundColor: index === currentMovieIndex ? 'white' : 'gray',
        transition: 'background-color 0.5s ease',
        display: 'inline-block',
        margin: '0 5px',
        cursor: 'pointer',
        animation: 'spin 2s linear infinite',
      }}
    />
  );
}
