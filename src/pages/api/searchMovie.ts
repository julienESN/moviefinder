// Importer les types pour NextApiRequest et NextApiResponse de Next.js
import type { NextApiRequest, NextApiResponse } from 'next';

// Exporter la fonction handler qui gère les requêtes à cette API
export default async function handler(
  req: NextApiRequest, // Type pour la requête entrante
  res: NextApiResponse // Type pour la réponse sortante
) {
  // Extraire le paramètre "title" de la requête
  const { title } = req.query;

  // Si le paramètre "title" est manquant, renvoyer une erreur avec le code de statut 400
  if (!title) {
    res.status(400).json({ error: 'Title parameter is missing' });
    return;
  }
  //
  const titleWithUnderscores =
    typeof title === 'string' ? title.replace(/ /g, '_') : '';

  try {
    // Appeler l'API externe en utilisant le paramètre "titleWithUnderscores" avec les caractères spéciaux encodés
    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(
        titleWithUnderscores
      )}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );
    // Attendre la résolution de la promesse et récupérer les données JSON
    const data = await response.json();
    console.log(data);
    // Renvoyer les données JSON avec un code de statut 200 (succès)
    res.status(200).json(data);
  } catch (error) {
    // Si une erreur se produit lors de l'appel de l'API externe, renvoyer une erreur avec le code de statut 500
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
}
