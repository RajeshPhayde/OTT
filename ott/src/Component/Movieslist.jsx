import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movieslist = ({movies, title}) => {

    let [favId , setFavId] = useState(null);

    useEffect(()=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        setFavId(fav.map((m)=>{return m.id}))
        console.log("Done");
    },[])

    let add = (movie)=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        fav.push(movie);
        setFavId(fav.map((m)=>{return m.id}))
        localStorage.setItem("fav", JSON.stringify(fav));
    }

    let remove = (id)=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        fav = fav.filter((m)=>{return m.id != id});
        setFavId(fav.map((m)=>{return m.id}))
        localStorage.setItem("fav", JSON.stringify(fav));
    }

    return ( 
        <div className="movielist">
                <h1 id="title"> {title} </h1><br />
                
                { movies && <div className="movies">
                            
                        {movies.map((movie)=>{ 
                            return(
                                   
                                <div key={movie.id} className="movie">

                                    { favId && favId.includes(movie.id) ?
                                      <button id="heart" className="remove-btn" onClick={()=>{ remove(movie.id) }}><i class='bx bxs-heart' style={{color:"#f90303"}} ></i></button> 
                                    : <button id="heart" className="add-btn" onClick={()=>{ add(movie) }}><i class='bx bx-heart' style={{color:"#f90303"}}  ></i></button> 
                                    }

                                    <Link to={`/moviedetails/${movie.id}`} >
                                        <img src={movie.poster} alt="..." width="200px" height="250px" />
                                        <h2>{movie.moviename}</h2>
                                        <p>{movie.genre}</p>
                                    </Link>
                                    </div>
                                                                        
                                    )})}
                            </div>
                }
            </div>
     );
}
 
export default Movieslist;