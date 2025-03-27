import { fetchFromAPI, fetchGenres } from "../../../../lib/fetchData";
import MovieCard from "../../components/MovieCard";
import PaginationButtons from "../../components/PaginationBtn";
import Navbar from "@/app/components/Navbar";

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || "1");
  const { id: genreId } = await params;

  // Fetching movies based on genre with correct pagination
  const data = await fetchFromAPI(
    `discover/movie?with_genres=${genreId}`,
    page
  );
  const movies: Movie[] = data.results;

  // Fetching genres to get the genre name
  const allGenres = await fetchGenres();
  const genre = allGenres.genres.find((g: Genre) => g.id === parseInt(genreId));

  return (
    <>
      <Navbar />
      <div className="p-4 pt-20">
        <h1 className="text-xl md:text-2xl font-normal mt-20 md:mt-10 lg:mt-0 mb-4">
          Movies by Genre: {genre ? genre.name : "Unknown"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {/* Adjusted the query for accurate pagination */}
        <PaginationButtons query={`genre/${genreId}`} currentPage={page} />
      </div>
    </>
  );
}
