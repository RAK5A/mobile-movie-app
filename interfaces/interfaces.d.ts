// generic media item used throughout the app. For TV shows we will map the `name` field
// into `title` when rendering so downstream components can stay unchanged.
interface Movie {
  id: number;
  title: string;
  name?: string; // some TMDB responses use `name` for TV shows
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  // other tv-specific fields omitted for brevity
}

interface TVShowDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string | null;
  genres: { id: number; name: string }[];
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  production_companies?: { id: number; name: string; logo_path: string | null }[];
  // similar to MovieDetails but with TV-specific properties
}

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

interface PersonDetails extends Person {
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  homepage: string | null;
  also_known_as: string[];
}

// generic credit entry for either movie or tv show
interface MovieCredit {
  id: number;
  mediaType: "movie" | "tv";
  title: string; // movie title or tv name
  poster_path: string | null;
  release_date: string; // first_air_date for tv
  character: string;
  vote_average?: number;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}