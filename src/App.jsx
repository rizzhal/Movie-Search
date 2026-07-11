import { useState } from "react"

function App(){
  const [searchInput , setSearchInput] = useState("");
  const [movies , setMovies] = useState([])
  const [isLoading , setIsLoading] = useState(false)
  const [error , setError] = useState("")

  async function searchMovie() {
    setIsLoading(true)
    // const apiKey= Your api key
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`)
      if(!response.ok){
        throw new Error(`http status error ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      setMovies(data)
      
    } catch (e) {
      console.error("Error fetchingData" , e)
      setError(e)
      setIsLoading(false)
    
    }
  }

  return(
    <div >
      <h1>Search Your Movie</h1>
      <input value={searchInput}
       type="text"
       placeholder="search your movie"
       onChange={(e) => setSearchInput(e.target.value)} />
       <button onClick={searchMovie}>{isLoading ? "Loading...." : "search"}</button>

    </div>
  )
}

export default App