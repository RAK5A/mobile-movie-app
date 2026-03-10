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
  return data.results;
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
  // use the "all" endpoint so we include both movies and TV shows in the
  // trending list.  normalizeTV will convert any tv entries to the Movie
  // interface so the UI components can treat them the same.
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/all/week`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results
    .map((item: any) => {
      if (item.media_type === "tv") return normalizeTV(item);
      return item as Movie;
    })
    .slice(0, 10);
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
    // use all media trending so TV appears in the "See all" trending list too
    trending: `${TMDB_CONFIG.BASE_URL}/trending/all/week?page=${page}`,
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
  // `trending/all` returns a mix of movies and tv shows; convert tv entries
  // to our Movie interface so callers can treat the array uniformly.
  return data.results.map((item: any) => {
    if (item.media_type === "tv") {
      return normalizeTV(item);
    }
    return item as Movie;
  });
};

// -------- TV SHOWS --------------------------------------------------------------
// helper that converts a TV result into the Movie interface by mapping fields we
// use in the UI. This keeps the components unchanged.
const normalizeTV = (tv: any): Movie & { mediaType: "tv" } => ({
  id: tv.id,
  title: tv.name,
  name: tv.name,
  adult: false,
  backdrop_path: tv.backdrop_path,
  genre_ids: tv.genre_ids || [],
  original_language: tv.original_language,
  original_title: tv.original_name,
  overview: tv.overview,
  popularity: tv.popularity,
  poster_path: tv.poster_path,
  release_date: tv.first_air_date,
  video: false,
  vote_average: tv.vote_average,
  vote_count: tv.vote_count,
  mediaType: "tv",
});

export const fetchTVShows = async ({ query }: { query: string; }): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tv shows: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.map(normalizeTV);
};

export const fetchTrendingTVShows = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/tv/week`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trending tv shows: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.map(normalizeTV).slice(0, 10);
};

export const fetchPopularTVShows = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/popular`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch popular tv shows: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.map(normalizeTV).slice(0, 10);
};

export const fetchTopRatedTVShows = async (): Promise<Movie[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/top_rated`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch top rated tv shows: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.map(normalizeTV).slice(0, 10);
};

export const fetchTVDetails = async (tvId: string): Promise<TVShowDetails> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/tv/${tvId}?api_key=${TMDB_CONFIG.API_KEY}`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );

  if (!response.ok)
    throw new Error(`Failed to fetch tv details: ${response.statusText}`);

  const data = await response.json();
  return data;
};

export const fetchTVTrailer = async (
  tvId: number,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${TMDB_CONFIG.API_KEY}`,
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
    console.log("Error fetching tv trailer:", error);
    return null;
  }
};

export const fetchTVCast = async (tvId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/tv/${tvId}/credits`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error("Failed to fetch tv cast");
  const data = await response.json();
  return data.cast.slice(0, 10);
};

// ---------- PEOPLE / ACTORS --------------------------------------------------
export const fetchPersonDetails = async (personId: string): Promise<PersonDetails> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}?api_key=${TMDB_CONFIG.API_KEY}`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error("Failed to fetch person details");
  return response.json();
};

export const fetchPersonCredits = async (personId: string): Promise<MovieCredit[]> => {
  // combined_credits returns both movie and tv roles
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}/combined_credits?api_key=${TMDB_CONFIG.API_KEY}`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error("Failed to fetch person credits");
  const data = await response.json();
  return data.cast.map((c: any) => {
    const isTv = c.media_type === "tv";
    return {
      id: c.id,
      mediaType: isTv ? "tv" : "movie",
      title: isTv ? c.name : c.title,
      poster_path: c.poster_path || c.poster_path,
      release_date: isTv ? c.first_air_date : c.release_date,
      character: c.character,
      vote_average: c.vote_average ?? 0,
    };
  });
};

export const fetchPopularPeople = async (): Promise<Person[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/person/popular`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) throw new Error("Failed to fetch people");
  const data = await response.json();
  return data.results;
};

export const searchPeople = async (query: string): Promise<Person[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/search/person?query=${encodeURIComponent(query)}`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error("Failed to search people");
  const data = await response.json();
  return data.results;
};

// tv category paging helper
export const fetchTVByCategory = async (category: string, page: number = 1): Promise<Movie[]> => {
  const endpoints: Record<string, string> = {
    trending_tv: `${TMDB_CONFIG.BASE_URL}/trending/tv/week?page=${page}`,
    popular_tv: `${TMDB_CONFIG.BASE_URL}/tv/popular?page=${page}`,
    top_rated_tv: `${TMDB_CONFIG.BASE_URL}/tv/top_rated?page=${page}`,
    on_the_air_tv: `${TMDB_CONFIG.BASE_URL}/tv/on_the_air?page=${page}`,
  };

  const url = endpoints[category];
  if (!url) throw new Error(`Unknown tv category ${category}`);

  const response = await fetch(`${url}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

  const data = await response.json();
  return data.results.map(normalizeTV);
};

export const fetchMovieCast = async (movieId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!response.ok) throw new Error("Failed to fetch cast");
  const data = await response.json();
  return data.cast.slice(0, 10); // top 10 cast members
};