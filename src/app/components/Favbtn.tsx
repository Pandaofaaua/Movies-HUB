"use client";
import { useState, useEffect } from "react";
import { addFavorite, getFavorites, removeFavorite } from "./Favorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is in favorites
    setIsFavorite(getFavorites().includes(movieId));
  }, [movieId]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
    setIsFavorite(!isFavorite); // Toggle state
  };

  return (
    <button
      onClick={toggleFavorite}
      className="bg-blue-500 hover:bg-white
       text-white text-xs md:text-sm hover:text-blue-500
       transition transform hover:scale-95 p-1 rounded-md italic"
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
