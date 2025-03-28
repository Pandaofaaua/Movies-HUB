"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchGenresList } from "../../../lib/fetchData";

const GenreFilter = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenresList();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    getGenres();
  }, []);

  const handleGenreChange = (genreId: number) => {
    router.push(`/genre/${genreId}?page=1`);
  };

  return (
    <div className="flex justify-end mb-4">
      <h2 className="flex items-center text-sm md:text-lg font-semibold mb-2">
        Filter by Genre:
      </h2>
      <select
        onChange={(e) => handleGenreChange(Number(e.target.value))}
        className="flex items-start p-1 text-xs md:text-base border rounded-md outline-none ml-2 dark:text-white dark:bg-gray-800
        cursor-pointer"
      >
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
