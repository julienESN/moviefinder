// Importation des hooks nécessaires et de notre hook personnalisé pour récupérer les films populaires
import usePopularMovies from '../../api/usePopularMovies/usePopularMovies';
import { useEffect, useState } from 'react';
import MovieIndicator from './MovieIndicator/MovieIndicator'; // Importation du composant MovieIndicator
import PresentationText from './PresentationText/PresentationText'; // Importation du composant PresentationText
export default function MovieSlider({ onMovieChange }) {
  // Utilisation de notre hook personnalisé pour récupérer une liste de films populaires
  const movies = usePopularMovies();
  // Utilisation du hook useState pour stocker l'indice du film actuellement affiché
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  // Textes de présentation affichés pour chaque film
  const presentationTexts = [
    'Connect with the world to discuss your favorite movies and series',
    'Join our community and share your thoughts on the latest blockbusters',
    'Discover new films and series with our vibrant community',
    'Talk about your favorite moments in cinema history',
    'Engage in deep discussions about film and series plots, characters, and theories',
  ];
  // Utilisation du hook useEffect pour changer le film actuel toutes les 10 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        // Vérification si la liste des films n'est pas vide
        movies && movies.length > 0 ? (prevIndex + 1) % movies.length : 0
      );
    }, 10 * 1000);
    // Nettoyage de l'effet en supprimant l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [movies]);
  // Récupération du film actuel en se basant sur l'indice courant
  const currentMovie =
    movies && movies.length > currentMovieIndex
      ? movies[currentMovieIndex]
      : null;
  // Appel de la fonction de rappel onMovieChange à chaque fois que le film actuel change
  useEffect(() => {
    onMovieChange(currentMovie);
  }, [currentMovie, onMovieChange]);
  // Affichage du composant
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
        transition: 'background-image 1s ease-in-out', // Add this line
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(6 10 6 / 50%)',
          boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.2)',
        }}
      />
      {currentMovie && (
        <>
          <PresentationText
            currentMovie={currentMovie}
            currentMovieIndex={currentMovieIndex}
            presentationTexts={presentationTexts}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              width: '100%',
              textAlign: 'center',
              marginBottom: '10rem',
            }}
          >
            {movies.slice(0, 5).map((_, index) => (
              <MovieIndicator
                key={index}
                index={index}
                currentMovieIndex={currentMovieIndex}
                setCurrentMovieIndex={setCurrentMovieIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
