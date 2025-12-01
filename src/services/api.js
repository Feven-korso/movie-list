const API_KEY = "703b77c67daca9663962cfc66e591caf";
const BASE_URL = "https://api.themoviedb.org/3"; // Fixed URL

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results; // Added return statement
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`); // Fixed endpoint and query
    const data = await response.json();
    return data.results;
};