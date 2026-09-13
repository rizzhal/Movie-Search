import { MovieCard } from "./MovieCard.js";

export interface Movie {
    imdbID: string
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
}

interface MovieListProps{
    movies: Movie[]
}

export const MovieList = ({movies}: MovieListProps ) => {
    if(movies.length === 0) return null;
    return (
        <div className="grid grid-cols-3">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
        </div>
    )
   
}