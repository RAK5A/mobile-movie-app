export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.slice(0, 9);
};

export const fecthMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      { method: "GET", headers: TMDB_CONFIG.headers },
    );

    if (!response.ok)
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieTrailer = async (
  movieId: number,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_CONFIG.API_KEY}`,
      { method: "GET", headers: TMDB_CONFIG.headers },
    );

    if (!response.ok)
      throw new Error(`Failed to fetch trailer: ${response.statusText}`);

    const data = await response.json();
    const trailer = data.results.find(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
    );
    return trailer ? trailer.key : null;
  } catch (error) {
    console.log("Error fetching movie trailer:", error);
    return null;
  }
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/movie/week`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchUpComingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/upcoming`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/top_rated`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch top rated movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchMoviesByCategory = async (category: string, page: number = 1): Promise<Movie[]> => {
  const endpoints: Record<string, string> = {
    trending: `${TMDB_CONFIG.BASE_URL}/trending/movie/week?page=${page}`,
    upcoming: `${TMDB_CONFIG.BASE_URL}/movie/upcoming?page=${page}`,
    top_rated: `${TMDB_CONFIG.BASE_URL}/movie/top_rated?page=${page}`,
    latest: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`,
  };

  const response = await fetch(`${endpoints[category]}&page=${page}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

  const data = await response.json();
  return data.results;
};