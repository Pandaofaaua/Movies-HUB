// src/app/movie/[id]/page.tsx
import { fetchFromAPI } from "../../../../lib/fetchData";
import Link from "next/link";
import MovieCard from "@/app/components/MovieCard";
import FavoriteButton from "@/app/components/Favbtn";

interface Cast {
  id: number;
  name: string;
  character: string;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const movie: Movie = await fetchFromAPI(`movie/${params.id}`);
  if (!movie) return <p>No results found.</p>;

  // Fetch trailers from the API
  const trailersData = await fetchFromAPI(`movie/${params.id}/videos`);
  const trailers = trailersData.results.filter(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  );

  // Fetch credits for cast and crew
  const credits = await fetchFromAPI(`movie/${params.id}/credits`);
  const topCast: Cast[] = credits.cast.slice(0, 3);
  const mainCrew: Crew[] = credits.crew
    .filter(
      (member: Crew) => member.job === "Director" || member.job === "Producer"
    )
    .slice(0, 2);
  // Fetch similar movies
  const similarMoviesData = await fetchFromAPI(`movie/${params.id}/similar`);
  const similarMovies: Movie[] = similarMoviesData.results.slice(0, 6);

  return (
    <div className="p-6">
      <Link href="/" className="text-blue-500">
        &larr; Back to Home
      </Link>
      <div className="mt-4 flex flex-col gap-6 lg:gap-3">
        <div className="flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md shadow-md h-auto w-48 md:w-64 lg:w-72"
          />
        </div>
        <div className="flex flex-col lg:gap-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-600">Release Date: {movie.release_date}</p>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-gray-600">Rating: {movie.vote_average} ⭐</p>
            <FavoriteButton movieId={params.id} />
          </div>
          <p className="mt-4 text-lg sm:text-xl font-medium">
            {movie.overview}
          </p>
          <div className="mt-4 mb-2 text-sm sm:text-lg">
            <h3 className="font-medium">Genres:</h3>
            <ul className="list-disc list-inside font-normal">
              {movie.genres.map((genre) => (
                <div className="md:inline-block md:pr-3" key={genre.id}>
                  <li key={genre.id}>{genre.name}</li>
                </div>
              ))}
            </ul>
          </div>
          {movie.budget > 0 && (
            <p className="text-gray-600 italic text-sm sm:text-base">
              Budget: ${movie.budget.toLocaleString()}
            </p>
          )}
          <p className="text-gray-600 itali text-sm sm:text-base">
            Runtime: {movie.runtime} minutes
          </p>
          {movie.production_companies.length > 0 && (
            <div className="mt-4 mb-2 text-sm sm:text-lg">
              <h3 className="font-medium">Production Companies:</h3>
              <ul className="list-disc list-inside font-normal">
                {movie.production_companies.map((company) => (
                  <div className="md:inline-block md:pr-3" key={company.id}>
                    <li key={company.id}>{company.name}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Display top cast */}
          {topCast.length > 0 && (
            <div className="mt-4 mb-2 text-sm sm:text-lg">
              <h3 className="font-medium">Top Cast:</h3>
              <ul className="list-disc list-inside font-normal">
                {topCast.map((actor: Cast) => (
                  <div className="md:inline-block md:pr-3" key={actor.id}>
                    <li key={actor.id}>
                      {actor.name} as{" "}
                      <span className="italic">{actor.character}</span>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Display main crew */}
          {mainCrew.length > 0 && (
            <div className="mt-4 mb-2 text-sm sm:text-lg">
              <h3 className="font-medium">Main Crew:</h3>
              <ul className="list-disc list-inside font-normal">
                {mainCrew.map((member: Crew) => (
                  <div className="md:inline-block md:pr-3" key={member.id}>
                    <li key={member.id}>
                      {member.name} -{" "}
                      <span className="italic">{member.job}</span>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Display trailer if available */}
          {trailers.length > 0 ? (
            <div className="mt-6">
              <h3 className="font-semibold">Watch Trailer:</h3>
              <iframe
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                title="Movie Trailer"
                className="p-2 w-full h-48 md:h-64 lg:h-72 rounded-md shadow-md"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-600 italic mt-4">No trailer available.</p>
          )}

          {/* Similar Movies Section */}
          {similarMovies.length > 0 && (
            <div className="mt-6">
              <h3 className="font-normal">Similar Movies:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {similarMovies.map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
