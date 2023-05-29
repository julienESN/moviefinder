export default function PresentationText({
  currentMovie,
  currentMovieIndex,
  presentationTexts,
}) {
  // Vérifiez si currentMovie et presentationTexts existent avant d'utiliser leurs valeurs
  const text =
    currentMovie && presentationTexts && presentationTexts[currentMovieIndex]
      ? presentationTexts[currentMovieIndex]
      : '';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '25%',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '3vh',
        transition: 'opacity 1s',
        opacity: currentMovie ? 1 : 0,
      }}
    >
      {text}
    </div>
  );
}
