// Importation des dépendances nécessaires
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface BackgroundVideoProps {
  movieTitle: string;
}

// Fonction pour récupérer la bande-annonce d'un film
const fetchMovieTrailer = async (movieTitle: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
        movieTitle + ' movie trailer'
      )}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    const trailer = data.items[0];

    if (trailer) {
      return trailer.id.videoId;
    }
  } catch (error) {
    console.error('Failed to fetch movie trailer', error);
  }
  return '';
};

// Composant BackgroundVideo pour afficher la vidéo en arrière-plan
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ movieTitle }) => {
  // Déclaration de l'état pour l'ID de la vidéo
  const [videoId, setVideoId] = useState(null);

  // Utilisation de useEffect pour récupérer la bande-annonce du film
  useEffect(() => {
    const fetchTrailer = async () => {
      if (movieTitle) {
        const trailerId = await fetchMovieTrailer(movieTitle);
        setVideoId(trailerId);
      }
    };

    fetchTrailer();
  }, [movieTitle]);

  // Options de configuration du lecteur vidéo YouTube
  const videoOpts = {
    height: '500rem',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Rendu du composant BackgroundVideo
  return (
    <div className="video-background h-screen w-screen">
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={videoOpts}
          className="h-screen w-screen"
        />
      )}
    </div>
  );
};

export default BackgroundVideo;
