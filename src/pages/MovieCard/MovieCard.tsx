import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    Type: string;
    imdbRating: string;
    Poster: string;
    Genre: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="text-center mb-8 relative">
      <h3
        className="text-4xl font-semibold text-red-600"
        style={{ fontFamily: 'Bebas Neue' }}
      >
        {movie.Title}
      </h3>
      <p className="text-gray-600 mb-2">{movie.Year}</p>
      <Image
        src={movie.Poster}
        alt={`Poster de ${movie.Title}`}
        width={200}
        height={300}
        className="mx-auto block transform transition-all duration-200 hover:scale-110"
      />
      <div className="hover-info relative w-full h-auto bg-transparent bg-opacity-70 opacity-100 transition-all duration-200 flex flex-col items-center justify-center mt-4">
        <p className="text-white font-semibold text-lg">
          {movie.Type &&
            movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}{' '}
          - {movie.Year}
        </p>
        <p className="text-white font-semibold text-md">{movie.Genre}</p>
        <div className="flex items-center">
          <span className="text-white font-semibold text-lg">
            {movie.imdbRating}
          </span>
          <Image
            src="/assets/imdb_logo.png"
            alt="Logo IMDb"
            width={16}
            height={16}
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
