export const addFavorite = (movieId: string) => {
  let favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (movieId: string) => {
  let favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

  favorites = favorites.filter((id: string) => id !== movieId);
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = (): string[] => {
  return JSON.parse(sessionStorage.getItem("favorites") || "[]");
};
