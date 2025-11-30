import MovieCard from "../components/MovieCard"
import { useState } from 'react';

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const movie = [
        {id: 1, title: "sheldon", release_date: "2024"},
        {id: 2, title: "eldon", release_date: "2024"},
        {id: 3, title: "eldon", release_date: "2024"},
        {id: 4, title: "don", release_date: "2024"},]
    const handleSearch = () =>{
        alert(searchQuery)
    };

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="search for movie.." className="search-input"  value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)
            }/>
            <button type="submit" className="search-button">search</button>
        </form>
        <div className="movie-grid">
            {movie.map(movie => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
}
export default Home