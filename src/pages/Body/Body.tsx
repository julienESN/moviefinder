import React, { useState } from 'react';
import Header from '../header/Header';
import BackgroundVideo from '@/Backgroundvideo/Backgroundvideo';
import Image from 'next/image';
interface MovieData {
  Title: string;
  Year: string;
  Type: string;
  imdbRating: string;
  Poster: string;
}

const Body: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');

  const searchMovies = async (title: string) => {
    setIsLoading(true);
    setMovieTitle(title);
    try {
      const response = await fetch(
        `/api/searchMovie?title=${encodeURIComponent(title)}`
      );
      const data: MovieData = await response.json();

      setMovies([data]);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Header onSearch={searchMovies} />
      <div className="w-full mt-10 flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 h-full">
          {isLoading ? (
            <Image
              src="/assets/Rolling-0.9s-204px.svg"
              alt="Chargement"
              width={204}
              height={204}
              className="text-xl font-semibold mx-auto block"
            />
          ) : (
            movies.map((movie, index) => (
              <div key={index} className="text-center mb-8 relative">
                <h3
                  className="text-4xl font-semibold text-red-600"
                  style={{ fontFamily: 'Bebas Neue' }}
                >
                  {movie.Title}
                </h3>
                <p className="text-gray-600">{movie.Year}</p>
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={200}
                  height={300}
                  className="mx-auto block transform transition-all duration-200 hover:scale-110"
                />
                <div className="hover-info relative w-full h-auto bg-transparent bg-opacity-70 opacity-100 transition-all duration-200 flex flex-col items-center justify-center mt-4">
                  <p className="text-white font-semibold text-lg">
                    {movie.Type &&
                      movie.Type.charAt(0).toUpperCase() +
                        movie.Type.slice(1)}{' '}
                    - {movie.Year}
                  </p>
                  <div className="flex items-center">
                    <span className="text-white font-semibold text-lg">
                      {movie.imdbRating}
                    </span>
                    <Image
                      src="/assets/imdb_logo.png"
                      alt="IMDb logo"
                      width={16}
                      height={16}
                      className="ml-2"
                    />
                  </div>
                </div>
              </div>
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
