import { fetchFromAPI } from "../../lib/fetchData";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import GenreFilter from "./components/GenreFilter";
import PaginationButtons from "./components/PaginationBtn";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const data = await fetchFromAPI(`movie/popular`, page);
  const movies: Movie[] = data.results;

  return (
    <>
      <Navbar />
      <div className="p-4 pt-20">
        <h1 className="text-xl md:text-2xl font-normal mt-20 md:mt-10 lg:mt-0 mb-4">
          Popular Movies
        </h1>
        <div className="flex justify-between items-center">
          <Link
            href="/profile/Favorites"
            className="text-blue-500 text-sm md:text-lg font-light italic"
          >
            Go to Favorites &rarr;
          </Link>
          <GenreFilter />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <PaginationButtons query="popular" currentPage={page} />
      </div>
    </>
  );
}
