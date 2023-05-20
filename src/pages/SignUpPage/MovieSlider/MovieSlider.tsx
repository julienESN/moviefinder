import usePopularMovies from '../../api/usePopularMovies/usePopularMovies';
import { useEffect, useState } from 'react';

export default function MovieSlider({ onMovieChange }) {
  const movies = usePopularMovies();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const presentationTexts = [
    'Connect with the world to discuss your favorite movies and series',
    'Join our community and share your thoughts on the latest blockbusters',
    'Discover new films and series with our vibrant community',
    'Talk about your favorite moments in cinema history',
    'Engage in deep discussions about film and series plots, characters, and theories',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        movies && movies.length > 0 ? (prevIndex + 1) % movies.length : 0
      );
    }, 10 * 1000);

    return () => clearInterval(intervalId);
  }, [movies]);

  const currentMovie =
    movies && movies.length > currentMovieIndex
      ? movies[currentMovieIndex]
      : null;

  useEffect(() => {
    onMovieChange(currentMovie);
  }, [currentMovie, onMovieChange]);

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${currentMovie?.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(6 10 6 / 50%)', // green tint
          boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.2)', // updated box shadow
        }}
      />
      {currentMovie && (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: '25%', // Placing the text at 25% from the bottom
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
          <div
            style={{
              position: 'absolute',
              bottom: '20px', // Placing indicators below the text
              width: '100%',
              textAlign: 'center',
              marginBottom: '10rem',
            }}
          >
            {movies.slice(0, 5).map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentMovieIndex(index)}
                style={{
                  height: '0.4vw',
                  width: '70px',
                  backgroundColor:
                    index === currentMovieIndex ? 'white' : 'gray',
                  display: 'inline-block',
                  margin: '0 5px',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
