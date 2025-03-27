"use client";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

interface Movie {
  id: number;
  title: string;
}

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);

  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setError("");
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_SECRET}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setResults(data.results || []);
        if (data.results.length === 0) {
          setError("No results found");
        } else {
          setError("");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Network error, please try again later");
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError("");
  };

  const handleSelect = (id: number) => {
    setQuery("");
    setResults([]);
    setError("");
    router.push(`/movie/${id}`);
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className="text-blue-600 dark:bg-black
           w-full pl-8 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
        />
        {query && (
          <XCircleIcon
            className="absolute right-2 top-2 h-5 w-5 text-gray-500 cursor-pointer hover:text-red-500 transition duration-300"
            onClick={() => setQuery("")}
          />
        )}
      </div>
      {error && (
        <p className="mt-2 text-red-500 transition duration-300">{error}</p>
      )}

      {results.length > 0 && (
        <motion.ul
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {results.map((movie) => (
            <motion.li
              key={movie.id}
              onClick={() => handleSelect(movie.id)}
              className="px-4 py-2 dark:bg-black hover:bg-blue-100
              dark:hover:bg-slate-500 cursor-pointer transition duration-300 ease-in-out"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold text-blue-700">
                {movie.title.slice(0, query.length)}
              </span>
              {movie.title.slice(query.length)}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
