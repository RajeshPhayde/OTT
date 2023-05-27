import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Relaventmovies from "./Relaventmovies";
import { useNavigate } from "react-router-dom";

const Moviedetails = () => {
    
    let {id} = useParams();
    let navigate = useNavigate();
    let [movie, setMovie] = useState(null);
    let [error, seterror] = useState(null);
    let [pending, setpending] = useState(true);

    useEffect(()=>{
        setMovie(null);
        setpending(true);
            setTimeout(()=>{
                fetch("http://localhost:4000/movies/"+ id)
                .then((res)=>{ return res.json()})
                .then((data)=>{
                    console.log(data)
                    setMovie(data)
                    setpending(false)
                })
                .catch((err)=>{console.log(err.message)
                                seterror(err.message)
                                setpending(false)})
            }, 1000)
    }, [id])

    let deletemovie = (moviename)=>{
        let res = prompt("Are you sure ?? Enter moviename to continue.");
            
        if(res.toLowerCase()==moviename.toLowerCase()){
            fetch("http://localhost:4000/movies/"+ id , {
                method : "DELETE"
            })
            .then(()=>{
                 alert("Movie got delted !!! Reverting to home page")
                 navigate("/")})
        }
    }
    
    return ( 
        <div className="mdetails">

        { pending && <div id="loading">
            <img  src="https://myraah.io/themev3/static/img/dual-ball-loader2.svg" style={{ "min-height" : "350px"}}></img>
        </div> }

        

        { error!=null && <h2> {error}</h2> }

        {movie &&   <div className="main-div">
                        <div id="div1">
                            <div id="div3">
                                <div id="div5">
                                    <img src={movie.poster} loading="lazy" alt="poster"/>
                                </div>
                                <div id="div6">
                                    <h1>{movie.moviename}</h1>
                                    <h3>Genre : {movie.genre}</h3>
                                    <h3>Rating : {movie.rating}</h3>
                                    <h3>Cast : {movie.hero}, {movie.heroine}</h3>
                                    <h3>Director : {movie.director}</h3>
                                    <h3>Release : {movie.release}</h3>
                                    <h3>Languages : {movie.languages.join(" , ")}</h3>
                                    <br />
                                    <button id="del" onClick={()=>{deletemovie(movie.moviename)}}>Delete</button>
                                    
                                    <Link to={`/update/${id}`}><button id="del" onClick={()=>{  }}>Update</button></Link>

                                </div>
                            </div>
                            <div id="div4">
                                <h3><iframe width="560" height="315" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></h3>
                            </div>
                        </div>
                        <div id="div2">
                                <p>{movie.synopsis}</p>
                        </div>

                    </div>
        }
            {movie && <Relaventmovies genre = {movie.genre}/>}
         
        </div>
        

           


        
        
     );
}
 
export default Moviedetails;