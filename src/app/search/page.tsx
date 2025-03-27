import { fetchFromAPI } from "../../../lib/fetchData";
import SearchResults from "../components/SearchResult";
import Navbar from "../components/Navbar";
import PaginationButtons from "../components/PaginationBtn";
export default async function Search({
  searchParams,
}: {
  searchParams: { query: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const data = await fetchFromAPI(
    `search/movie?query=${searchParams.query}&page=${page}`
  );
  const movies: Movie[] = data.results;

  return (
    <>
      <Navbar />
      <div className="p-6 pt-20">
        <h2 className="text-2xl font-bold mt-6 md:mt-0 mb-4 md:mb-8">
          Search Results for "{searchParams.query}"
        </h2>
        <SearchResults movies={movies} />
        <PaginationButtons query={searchParams.query} currentPage={page} />
      </div>
    </>
  );
}
