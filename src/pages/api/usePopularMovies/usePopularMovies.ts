import { useEffect, useState } from 'react';
import axios from 'axios';
interface Movie {
  poster_path: string;
  title: string;
}
export default function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]); // Spécifiez le type ici comme Movie[]

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a8375fced103361ef83cab04ec359ef2&language=fr-FR&page=1`
      );
      setMovies(response.data.results.slice(0, 5));
    };

    fetchMovies();
  }, []);

  return movies;
}
