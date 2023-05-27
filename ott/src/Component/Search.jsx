import { useParams } from "react-router-dom";
import Movieslist from "./Movieslist";
import { useEffect, useState } from "react";

const Search = () => {
    
    let {searchkey} = useParams();
    let [movies, setMovies] = useState(null);
    let [error, seterror] = useState(null);
    let [pending, setpending] = useState(true);

    useEffect(()=>{
        setMovies(null);
        setpending(true);
        setTimeout(()=>{
                
                    fetch("http://localhost:4000/movies")
                    .then((res)=>{return res.json()})
                    .then((data)=>{
                        let d = data.filter((m)=>{return (m.moviename.toLowerCase().startsWith(searchkey.toLowerCase()))
                            || (m.genre.toLowerCase()===searchkey.toLowerCase()) || (m.languages.includes(searchkey)) || (m.hero.toLowerCase().includes(searchkey.toLocaleLowerCase()))
                            })
                        setMovies(d)
                        setpending(false)})

                    .catch((err)=>{console.log(err.message)
                        seterror(err.message)
                        setpending(false)})
    
        },1000)
        },[searchkey])

    return ( 
        <div>
            
            { pending && <div id="loading">
            <img  src="https://myraah.io/themev3/static/img/dual-ball-loader2.svg" style={{ "min-height" : "350px"}}></img>
        </div> }

        

        { error!=null && <h2> {error}</h2> }

           {movies &&  <Movieslist movies={movies} title="Search result"/>}
        </div>
     );
}
 
export default Search;