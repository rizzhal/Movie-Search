import type { Movie } from "./MovieList.js"



interface MovieCardProps {
   movie: Movie
}
export const MovieCard = ({movie }: MovieCardProps) => {
    return (
        <div>
            <img src={movie.Poster} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
        </div>
    )

}