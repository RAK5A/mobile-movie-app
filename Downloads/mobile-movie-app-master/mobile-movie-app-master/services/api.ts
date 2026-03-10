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

// Get list of popular people
export const fetchPopularPeople = async (page = 1): Promise<Person[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/popular?language=en-US&page=${page}`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch people: ${response.statusText}`);
  const data = await response.json();
  return data.results;
};

// Get full details of one person by their ID
export const fetchPersonDetail = async (
  personId: number,
): Promise<PersonDetail> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}?language=en-US`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch person: ${response.statusText}`);
  return response.json();
};

// Get all profile photos of a person
export const fetchPersonImages = async (
  personId: number,
): Promise<PersonImage[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}/images`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  const data = await response.json();
  return data.profiles;
};

// Get all movies and TV shows a person appeared in
export const fetchPersonCredits = async (
  personId: number,
): Promise<PersonCredit[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/person/${personId}/combined_credits?language=en-US`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch credits: ${response.statusText}`);
  const data = await response.json();
  return data.cast;
};

// Search people by name
export const searchPeople = async (query: string): Promise<Person[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/search/person?query=${encodeURIComponent(query)}&language=en-US`,
    { method: "GET", headers: TMDB_CONFIG.headers },
  );
  if (!response.ok)
    throw new Error(`Failed to search people: ${response.statusText}`);
  const data = await response.json();
  return data.results;
};
