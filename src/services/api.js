import axios from "axios";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Using the provided API key

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Array of popular movie keywords to get random results
const MOVIE_KEYWORDS = [
  // Superhero/Comic Movies
  "marvel",
  "avengers",
  "batman",
  "superman",
  "spider",
  "thor",
  "iron",
  "captain",
  "wonder",
  "black",
  "hulk",
  "deadpool",
  "x-men",
  "wolverine",
  "justice",

  // Sci-Fi/Fantasy
  "star",
  "wars",
  "trek",
  "alien",
  "matrix",
  "lord",
  "rings",
  "harry",
  "potter",
  "hobbit",
  "avatar",
  "terminator",
  "jurassic",
  "blade",
  "predator",

  // Action/Adventure
  "mission",
  "impossible",
  "james",
  "bond",
  "bourne",
  "fast",
  "furious",
  "indiana",
  "jones",
  "pirates",
  "caribbean",
  "john",
  "wick",
  "transformers",
  "tomb",

  // Animation
  "pixar",
  "disney",
  "dreamworks",
  "toy",
  "story",
  "shrek",
  "frozen",
  "finding",
  "incredibles",
  "lion",
  "king",
  "dragon",
  "kung",
  "panda",
  "madagascar",

  // Drama/Oscar Winners
  "godfather",
  "shawshank",
  "schindler",
  "forrest",
  "gump",
  "titanic",
  "gladiator",
  "departed",
  "inception",
  "interstellar",
  "prestige",
  "memento",
  "fight",
  "club",

  // Horror/Thriller
  "conjuring",
  "exorcist",
  "halloween",
  "friday",
  "nightmare",
  "saw",
  "alien",
  "quiet",
  "place",
  "it",
  "thing",
  "shining",
  "silence",
  "lambs",
  "jaws",

  // Classic/Iconic
  "casablanca",
  "citizen",
  "kane",
  "wizard",
  "gone",
  "wind",
  "apocalypse",
  "clockwork",
  "scarface",
  "goodfellas",
  "pulp",
  "fiction",
  "taxi",
  "driver",

  // Modern Classics
  "inception",
  "dark",
  "knight",
  "matrix",
  "saving",
  "private",
  "ryan",
  "green",
  "mile",
  "beautiful",
  "mind",
  "departed",
  "social",
  "network",
  "parasite",

  // Popular Directors
  "spielberg",
  "nolan",
  "tarantino",
  "scorsese",
  "kubrick",
  "fincher",
  "cameron",
  "anderson",
  "coen",
  "villeneuve",
  "ritchie",
  "wright",
  "snyder",
  "jackson",
];

export const searchMovies = async (query = "", page = 1) => {
  try {
    // Convert and clean the search query
    const searchQuery = String(query || "").trim();

    // If no search query, return random movies
    if (!searchQuery) {
      return getRandomMovies();
    }

    // Make the search request for 20 movies (using 2 parallel requests since OMDB gives 10 per page)
    const requests = [
      api.get("/", {
        params: {
          s: searchQuery,
          type: "movie",
          page: page * 2 - 1, // First half of the movies
          r: "json",
        },
      }),
      api.get("/", {
        params: {
          s: searchQuery,
          type: "movie",
          page: page * 2, // Second half of the movies
          r: "json",
        },
      }),
    ];

    const responses = await Promise.all(requests);

    // Check if either response has no results
    if (responses[0].data.Response === "False") {
      return {
        movies: [],
        totalResults: 0,
        currentPage: page,
        totalPages: 0,
        error: `No movies found for "${searchQuery}"`,
      };
    }

    // Combine and process movies from both responses
    const movies = responses
      .flatMap((response) =>
        response.data.Response === "True" ? response.data.Search || [] : []
      )
      .filter((movie) => movie && movie.Poster && movie.Poster !== "N/A")
      .map((movie) => ({
        ...movie,
        Poster: getImageUrl(movie.Poster),
      }))
      .slice(0, 20); // Ensure we only take 20 movies max

    const totalResults = parseInt(responses[0].data.totalResults) || 0;

    return {
      movies,
      totalResults,
      currentPage: page,
      totalPages: Math.ceil(totalResults / 20), // Adjust for 20 movies per page
      error: null,
      searchTerm: searchQuery,
    };
  } catch (error) {
    console.error("Search error:", error);
    return {
      movies: [],
      totalResults: 0,
      currentPage: page,
      totalPages: 0,
      error: "Failed to search movies. Please try again.",
    };
  }
};

// Update getRandomMovies to show 20 movies
export const getRandomMovies = async () => {
  try {
    // Get 3 random keywords to ensure we get enough movies
    const randomKeywords = MOVIE_KEYWORDS.sort(() => Math.random() - 0.5).slice(
      0,
      3
    );

    // Make parallel requests
    const requests = randomKeywords.map((keyword) =>
      api.get("/", {
        params: {
          s: keyword,
          type: "movie",
          page: 1,
          r: "json",
        },
      })
    );

    const responses = await Promise.all(requests);

    // Process and combine results
    const allMovies = responses
      .flatMap((response) =>
        response.data.Response === "True" ? response.data.Search || [] : []
      )
      .filter((movie) => movie && movie.Poster && movie.Poster !== "N/A")
      .map((movie) => ({
        ...movie,
        Poster: getImageUrl(movie.Poster),
      }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 20); // Show 20 movies per page

    return {
      movies: allMovies,
      totalResults: allMovies.length,
      currentPage: 1,
      totalPages: 1,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching random movies:", error);
    return {
      movies: [],
      totalResults: 0,
      currentPage: 1,
      totalPages: 0,
      error: "Failed to fetch movies",
    };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await api.get("/", {
      params: {
        i: imdbID,
        plot: "full", // Get full plot
        r: "json",
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    // Ensure valid poster URL
    const movie = {
      ...response.data,
      Poster: getImageUrl(response.data.Poster),
    };

    return movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
};

export const getImageUrl = (posterUrl) => {
  if (!posterUrl || posterUrl === "N/A") {
    return "https://via.placeholder.com/300x450?text=No+Poster+Available";
  }
  return posterUrl;
};


export const fetchMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=short`);
  const data = await response.json();
  if (data.Response === 'False') throw new Error(data.Error);
  return data;
};

