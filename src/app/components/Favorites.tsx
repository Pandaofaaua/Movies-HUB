export const addFavorite = (movieId: string) => {
  console.log("Adding favorite:", movieId);
  const favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (movieId: string) => {
  const favorite = JSON.parse(sessionStorage.getItem("favorites") || "[]");

  const favorites = favorite.filter((id: string) => id !== movieId);
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = (): string[] => {
  return JSON.parse(sessionStorage.getItem("favorites") || "[]");
};
