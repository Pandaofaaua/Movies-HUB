const API_KEY = process.env.TMDB_API_SECRET;

export const fetchFromAPI = async (endpoint: string, page = 1) => {
  const url = endpoint.includes("?")
    ? `https://api.themoviedb.org/3/${endpoint}&api_key=${API_KEY}&page=${page}`
    : `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchFromAPI:", error);
    throw error;
  }
};

export const fetchGenresList = async () => {
  try {
    const response = await fetch("/api/genres");
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchGenres:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://movies-hub-by-loseyi.vercel.app";
    const response = await fetch(`${baseUrl}/api/genres`);

    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchGenres:", error);
    throw error;
  }
};
