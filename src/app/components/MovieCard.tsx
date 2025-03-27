"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.9, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ y: [100, 0], opacity: [0, 1], scale: [0.8, 1] }}
      >
        <Link href={`/movie/${movie.id}`}>
          <div
            className="border-2 border-black 
          dark:border-white rounded-lg p-2 hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto md:h-80 rounded-md mb-2"
            />
            <p className="text-lg font-semibold">{movie.title}</p>
            <p className="text-sm text-gray-500">
              Release Date: {movie.release_date}
            </p>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default MovieCard;
