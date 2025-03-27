"use client";
import { useEffect, useState } from "react";
import { getFavorites } from "@/app/components/Favorites";
import MovieCard from "../../components/MovieCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function FavoritesPage() {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const favorites = getFavorites();

    Promise.all(
      favorites.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        ).then((res) => res.json())
      )
    ).then(setFavoriteMovies);
  }, []);

  if (favoriteMovies.length > 0) {
    return (
      <>
        <div className="p-4">
          <Link href="/" className="text-blue-500">
            ← Back to Home
          </Link>
        </div>
        <div className="italic text-center p-6">
          {session ? (
            <>
              {(() => {
                const Name = session.user?.name?.trim().split(" ").shift();
                return (
                  <h1 className="text-xl md:text-3xl pb-5">
                    Here are your favorites movies {Name}🤗
                  </h1>
                );
              })()}
            </>
          ) : (
            <h1 className="text-3xl pb-5">
              {" "}
              Here are your favorites movies 🤗
            </h1>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="p-4">
        <Link href="/" className="text-blue-500">
          ← Back to Home
        </Link>
        <div className="flex flex-col justify-center items-center min-h-96">
          <p className="justify-center text-3xl italic text-center p-6 font-semibold">
            Oops No favorite movies yet!😔
          </p>
          <p>Try adding some...</p>
        </div>
      </div>
    );
  }
}
