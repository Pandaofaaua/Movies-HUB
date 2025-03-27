import Link from "next/link";
import Image from "next/image";

interface SearchResultsProps {
  movies: Movie[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="border rounded-lg p-2 hover:shadow-lg transition">
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-md mb-2"
              loading="lazy"
              width={500}
              height={750}
            />
            <p className="text-lg font-semibold">{movie.title}</p>
            <p className="text-sm text-gray-500">
              Release Date: {movie.release_date}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
