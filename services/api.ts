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

export const fetchMoviesByCategory = async (
  category: string,
  page: number = 1,
): Promise<Movie[]> => {
  const endpoints: Record<string, string> = {
    trending: `${TMDB_CONFIG.BASE_URL}/trending/movie/week?page=${page}`,
    upcoming: `${TMDB_CONFIG.BASE_URL}/movie/upcoming?page=${page}`,
    top_rated: `${TMDB_CONFIG.BASE_URL}/movie/top_rated?page=${page}`,
    discover: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`,
  };

  const response = await fetch(`${endpoints[category]}&page=${page}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

  const data = await response.json();
  return data.results;
};

export const fetchMovieCast = async (movieId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok) throw new Error("Failed to fetch cast");
  const data = await response.json();
  return data.cast.slice(0, 10); // top 10 cast members
};

export const fetchAllMovieCast = async (movieId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok) throw new Error("Failed to fetch cast");
  const data = await response.json();
  return data.cast;
};

export const fetchPopularPeople = async (page: number = 1) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/popular?page=${page}`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );

  if (!response.ok) throw new Error("Failed to fetch people");

  const data = await response.json();
  return data.results;
};

export const fetchPeopleId = async (personId: string) => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/person/${personId}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) throw new Error("Failed to fetch person detail");
  
  const data = await response.json();
  
  return data.results;
};

export const fetchPersonDetails = async (personId: string) => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/person/${personId}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) throw new Error("Failed to fetch person details");
  return await response.json();
};

export const fetchPersonMovies = async (personId: string) => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}/movie_credits`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  
  if (!response.ok) throw new Error("Failed to fetch person movie");
  
  const data = await response.json();
  
  return data.cast.slice(0, 10);
};

export const fetchTVShow = async ({
  query,
}: {
  query: string;
}): Promise<TVShow[]> => {
  const endpoint = query
  ? `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
  : `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`;
  
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tv show: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.results;
};

export const fetchPopularTvShow = async () => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/popular`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) throw new Error("Failed to fetch tv show");
  
  const data = await response.json();
  
  return data.results.slice(0, 10);
};

export const fetchTrendingTVShows = async (): Promise<TVShow[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/trending/tv/week`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch trending tv shows: ${response.statusText}`,
    );
  }
  
  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchTopRatedTVShows = async (): Promise<TVShow[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/top_rated`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) {
    throw new Error(
      `Failed to fetch top rated tv shows: ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchOnTheAirTVShows = async (): Promise<TVShow[]> => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/on_the_air`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) {
    throw new Error(
      `Failed to fetch on the air tv shows: ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.results.slice(0, 10); // ← show only 10 movies
};

export const fetchTVShowsDetail = async (
  tvId: string,
): Promise<TVShowDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/tv/${tvId}?api_key=${TMDB_CONFIG.API_KEY}`,
      { method: "GET", headers: TMDB_CONFIG.headers },
    );
    
    if (!response.ok)
      throw new Error(
    `Failed to fetch tv show details: ${response.statusText}`,
  );
  
  const data = await response.json();
  return data;
} catch (error) {
  console.log("Error fetching tv show details:", error);
  throw error;
}
};

export const fetchTVShowTrailer = async (
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

export const fetchTVShowCast = async (tvId: string) => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${tvId}/credits`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  
  if (!response.ok) throw new Error("Failed to fetch cast");
  
  const data = await response.json();
  return data.cast.slice(0, 10); // top 10 cast members
};

export const fetchTVShowsByCategory = async (
  category: string,
  page: number = 1,
): Promise<TVShow[]> => {
  const endpoints: Record<string, string> = {
    trending: `${TMDB_CONFIG.BASE_URL}/trending/tv/week?page=${page}`,
    on_the_air: `${TMDB_CONFIG.BASE_URL}/tv/on_the_air?page=${page}`,
    top_rated: `${TMDB_CONFIG.BASE_URL}/tv/top_rated?page=${page}`,
    discover: `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc&page=${page}`,
  };

  const response = await fetch(`${endpoints[category]}&page=${page}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

  const data = await response.json();
  return data.results;
};