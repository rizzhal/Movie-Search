import React, { useState } from "react"
import  { MovieList } from "./components/MovieList.js";
import type {Movie} from "./components/MovieList.js"

interface SearchResponse {
  Search:Movie[];
  Response:string;
  Error?:string;

}

function App(){
  const [searchInput , setSearchInput] = useState<string>("");
  const [movies , setMovies] = useState<Movie[]>([])
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const [error , setError] = useState<string>("")


  async function searchMovie() {
  if(!searchInput.trim()){
    setError("Movie not found")
    return
  }
    setIsLoading(true)
    setError("")
    try {
      const apiKey= '354c78e8'
      const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`)
      if(!response.ok){
        throw new Error(`http status error ${response.status}`)
      }
      const data:SearchResponse = await response.json()
      
      if(data.Response  === "False" ){
        setError(data.Error || "Something went wrong")
        return;
      }
      
      setMovies(data.Search)
    } catch (e: any) {
      if(e instanceof Error){
        setError(e.message)
      }
    } finally{
      setIsLoading(false)
    }

  }

  return(
    <div >
      <h1>Search Your Movie</h1>
      <input className="px-2 py-2  border-2 border-black" value={searchInput}
       type="text"
       placeholder="search your movie"
       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
       <button onClick={searchMovie}>search</button>
        <p>{isLoading ? "loading..." : ""}</p>
       <div><MovieList movies={movies}  /></div>    
        {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default App