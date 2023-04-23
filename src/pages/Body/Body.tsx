import React, { useState } from 'react';
import Header from '../header/Header';
import BackgroundVideo from '@/Backgroundvideo/Backgroundvideo';
import Image from 'next/image';
import MovieCard from '../MovieCard/MovieCard';

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
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const searchMovies = async (title: string) => {
    setIsLoading(true);
    setMovieTitle(title);
    setErrorMessage('');

    try {
      const response = await fetch(
        `/api/searchMovie?title=${encodeURIComponent(title)}`
      );
      const data: MovieData = await response.json();

      if (data.Error) {
        setErrorMessage(data.Error);
      } else {
        setMovies([data]);
      }
    } catch (error) {
      console.error('Failed to fetch movies', error);
      setErrorMessage('Une erreur est survenue lors de la recherche de films.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <Header onSearch={searchMovies} />
      <div className="w-full mt-10 flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 h-full">
          {isLoading ? (
            <div className="relative w-full h-[400px] md:h-[px]">
              <Image
                src="/assets/Rolling-0.9s-204px.svg"
                alt="Icône de chargement"
                width={100}
                height={100}
                className="text-xl font-semibold mx-auto block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ) : (
            movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          )}
        </div>
        {errorMessage ? (
          <div className="w-full flex justify-center">
            <h1 className="text-red-500">{errorMessage}</h1>
          </div>
        ) : null}
        <div className="w-full md:w-1/2 h-full">
          {isLoading ? (
            <div className="relative w-full h-[400px] md:h-[px]">
              <Image
                src="/assets/Rolling-0.9s-204px.svg"
                alt="Icône de chargement"
                width={100}
                height={100}
                className="text-xl font-semibold mx-auto block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ) : (
            <BackgroundVideo movieTitle={movieTitle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
