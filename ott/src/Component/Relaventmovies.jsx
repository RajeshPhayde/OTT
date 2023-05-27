import { useState, useEffect } from "react";
import Movieslist from "./Movieslist";


const Relaventmovies = ({genre}) => {
   
    let [movies, setMovies] = useState(null);

    useEffect( () => {
            fetch("http://localhost:4000/movies")
            .then((res)=>{ return res.json()})
            .then((data)=>{
                console.log(data)
                setMovies(data)
            })
    }, [])

    // window.scrollTo(0,0);
    //we have changed to reload behaviour in Moviedetails line 15 & 16.
   
    return ( 
        <div className="relevant-movies">
           
            {/* {movies && <Movieslist movies = {movies.filter((v)=>{return v.genre.includes(`${genre}`)})} title="Relevant Movies"/>} */}
            {movies && <Movieslist movies = {movies.filter((m)=>{
                                    return genre.split(" ").some((g)=>{
                                                    return m.genre.includes(g)})})} title="Relevant Movies"/>}
        </div>
     );
}
 
export default Relaventmovies;