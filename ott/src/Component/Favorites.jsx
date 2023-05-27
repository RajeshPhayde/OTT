import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Favorites = () => {
   
    let [favmovies, setFavmovies] = useState(null);

    useEffect(()=>{ 
        setTimeout(()=>{setFavmovies(JSON.parse(localStorage.getItem("fav")))},1000)
        console.log("data");
     },[favmovies])
            
    return ( 
        <div>

            { !favmovies && <div id="loading">
                <img  src="https://myraah.io/themev3/static/img/dual-ball-loader2.svg" style={{ "min-height" : "350px"}}></img>
            </div> }

            { favmovies && <Movieslist movies={favmovies} title="Favorite Movies" /> }
        </div>
     );
}
 
export default Favorites;