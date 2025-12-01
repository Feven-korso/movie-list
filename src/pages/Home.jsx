import MovieCard from "../components/MovieCard";
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) {
            // If search is empty, reload popular movies
            try {
                setLoading(true);
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setError(null);
            } catch (err) {
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            setLoading(true);
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
            // Optionally reload popular movies on error
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="home">Loading movies...</div>;
    }

    if (error) {
        return <div className="home">{error}</div>;
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movie..." 
                    className="search-input" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movie-grid">
                {movies.map(movie => ( // Fixed: movies.map instead of movie.map
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;