import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Home = () => {
    
    let [movies, setMovies] = useState(null);
    let [error, seterror] = useState(null);
    let [pending, setpending] = useState(true);

    useEffect(()=>
    {
            setTimeout(()=>{
                fetch("http://localhost:4000/movies")
                .then((res)=>{ return res.json()})
                .then((data)=>{
                    console.log(data)
                    setMovies(data)
                    setpending(false)
                })
                .catch((err)=>{console.log(err.message)
                                seterror(err.message)
                                setpending(false)})
            }, 1000)
    }, [])

    useEffect(()=>
    {
        if(localStorage.getItem("fav") == null)
        {
            localStorage.setItem("fav", "[]");
        }
    }, [])


    return ( 
        <div className="home">

            { pending && <div id="loading">
                <img  src="https://myraah.io/themev3/static/img/dual-ball-loader2.svg" style={{ "min-height" : "350px"}}></img>
            </div> }
           
           
            { error && <h2> Please connect to internet and try again ...!</h2> }

            {movies && !pending &&
                <><Movieslist movies = {movies} title="All Movies" />
            
                <Movieslist movies = {movies.filter((v)=>{return v.genre.includes("Action")})} title="Action Movies" />
                
                <Movieslist movies = {movies.filter((v)=>{return v.rating>8.5})} title="Top Rated Movies" /></>
            } 
        </div>
     );
}
 
export default Home;

//es6, rest, spread, promise
//dom

// react -> Components and lifecycle methods & state management
// -> about Hooks
// -> about React-Routing
// -> about Package manager (NPM)