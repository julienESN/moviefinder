import React, { useState } from 'react';
import Header from '../header/Header';
import BackgroundVideo from '@/Backgroundvideo/Backgroundvideo';
import Image from 'next/image';
import MovieCard from '../MovieCard/MovieCard'; // Import du composant MovieCard

// Définition de l'interface pour les données des films
interface MovieData {
  Title: string;
  Year: string;
  Type: string;
  imdbRating: string;
  Poster: string;
  Genre: string;
  Error?: string;
}

const Body: React.FC = () => {
  // États pour les données des films, le chargement, le titre du film et les messages d'erreur
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour rechercher les films
  const searchMovies = async (title: string) => {
    setIsLoading(true); // Affiche le chargement
    setMovieTitle(title);
    setErrorMessage(''); // Réinitialise le message d'erreur

    try {
      // Requête API pour rechercher les films
      const response = await fetch(
        `/api/searchMovie?title=${encodeURIComponent(title)}`
      );
      const data: MovieData = await response.json();

      // Gère les erreurs renvoyées par l'API
      if (data.Error) {
        setErrorMessage(data.Error);
      } else {
        setMovies([data]);
      }
    } catch (error) {
      // Gère les erreurs de requête
      console.error('Failed to fetch movies', error);
      setErrorMessage('Une erreur est survenue lors de la recherche de films.');
    } finally {
      setIsLoading(false); // Cache le chargement
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header onSearch={searchMovies} />
      <div className="w-full mt-10 flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 h-full">
          {isLoading ? (
            // Affiche l'icône de chargement si isLoading est vrai
            <Image
              src="/assets/Rolling-0.9s-204px.svg"
              alt="Icône de chargement"
              width={204}
              height={204}
              className="text-xl font-semibold mx-auto block"
            />
          ) : errorMessage ? (
            // Affiche le message d'erreur s'il existe
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            // Affiche les cartes de films en utilisant le composant MovieCard
            movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          )}
        </div>
        <div className="w-full md:w-1/2 h-full">
          <BackgroundVideo movieTitle={movieTitle} />
        </div>
      </div>
    </div>
  );
};

export default Body;
