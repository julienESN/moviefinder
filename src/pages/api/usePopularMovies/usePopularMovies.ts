import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a8375fced103361ef83cab04ec359ef2&language=fr-FR&page=1`
      );
      setMovies(response.data.results.slice(0, 5)); // Ici, nous limitons le nombre de films à 5
    };

    fetchMovies();
  }, []);

  return movies;
}
