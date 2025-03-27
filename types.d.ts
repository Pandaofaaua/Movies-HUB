type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  revenue: number;
  budget: number;
  production_companies: { id: number; name: string }[];
};

type Genre = {
  id: number;
  name: string;
};
