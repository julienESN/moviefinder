import { useEffect, useState } from 'react';
import axios from 'axios';

// Defining the interface for a movie
interface Movie {
  poster_path: string;
  title: string;
}

// Custom React Hook to fetch popular movies
export default function usePopularMovies() {
  // State to hold the movies data, initialized as an empty array of type Movie
  const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect Hook to perform side effects (in this case, fetching data)
  useEffect(() => {
    // Define an async function that fetches data from the MovieDB API
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a8375fced103361ef83cab04ec359ef2&language=fr-FR&page=1`
      );

      // Use the setMovies function to update our state with the response data
      // Note that we're only taking the first 5 results from the response
      setMovies(response.data.results.slice(0, 5));
    };

    // Call the fetchMovies function
    fetchMovies();
  }, []); // An empty dependency array means this effect will only run once, on mount

  // Return the movies data so it can be used by components that call this hook
  return movies;
}
