import { useState } from "react"

function App(){
  const [searchInput , setSearchInput] = useState("");
  const [movies , setMovies] = useState([])
  const [isLoading , setIsLoading] = useState(false)
  const [error , setError] = useState("")

  async function searchMovie() {
    setIsLoading(true)
    setError("")
    // const apiKey= Your API key
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`)
      if(!response.ok){
        throw new Error(`http status error ${response.status}`)
      }
      const data = await response.json()
      
      if(data.Response  === "False"){
        setError(data.Error)
        return;
      }
      console.log(data)
      setMovies(data.Search)
    } catch (e) {
      console.error(e.message)
      setError(e.message)
    } finally{
      setIsLoading(false)
    }
   
  }
     const movieList = movies.map((movie) => {
        return(
          <div key={movie.imdbID}>
            <img src={movie.Poster}/>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <p>{movie.Type}</p>
          </div>
        )
      });

  return(
    <div >
      <h1>Search Your Movie</h1>
      <input value={searchInput}
       type="text"
       placeholder="search your movie"
       onChange={(e) => setSearchInput(e.target.value)} />
       <button onClick={searchMovie}>search</button>
        <p>{isLoading ? "loading..." : ""}</p>
       <div>{movieList}</div>    
        {error && <p>{error}</p>}
    </div>
  )
}

export default App