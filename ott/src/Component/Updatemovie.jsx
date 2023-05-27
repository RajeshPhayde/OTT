import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Updatemovie = () => {
   
    let {id} = useParams();

    let navigate = useNavigate();
    let moviename = useRef();
    let hero = useRef();
    let heroine = useRef();
    let director = useRef();
    let genre = useRef();
    let poster = useRef();
    let trailer = useRef();
    let release = useRef();
    let rating = useRef();
    let synopsis = useRef();


    useEffect(()=>{
        fetch("http://localhost:4000/movies/"+id)
        .then((res)=>{return res.json()})
        .then((data)=>{
            moviename.current.value = data.moviename;
            hero.current.value = data.hero;
            heroine.current.value = data.heroine;
            director.current.value = data.director;
            genre.current.value = data.genre;
            poster.current.value = data.poster;
            trailer.current.value = data.trailer;
            release.current.value = data.release;
            rating.current.value = data.rating;
            synopsis.current.value = data.synopsis;
        })
    })

    let handleEditMovie = (e)=>{
        e.preventDefault();  
        
        // create new movie object

        // Access ref
        let editmovie = {
                        moviename : moviename.current.value,
                        hero : hero.current.value,
                        heroine : heroine.current.value,
                        director : director.current.value,
                        languages : [] ,
                        genre : genre.current.value,
                        poster : poster.current.value,
                        trailer : trailer.current.value,
                        release : release.current.value,
                        rating : rating.current.value,
                        synopsis : synopsis.current.value
        }

        let option = document.getElementsByName("lang");
        for (let i = 0; i < option.length; i++) 
        {
           if( option[i].checked == true )
           {
                editmovie.languages.push( option[i].value );
           }
        }

        //  send movie object to the database
        fetch("http://localhost:4000/movies/"+id, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(editmovie)
        })
        .then(()=>{
            alert("Movie got updated in database");
            // window.location.reload();
            navigate("/moviedetails/"+id);
        })

    }

    return ( 
        <div className="newMovie">
        <h1 style={{color : "#0f3e62"}}>Update movie details</h1><hr /><hr />
       
       <form onSubmit={handleEditMovie}>
                        {/* ----- Assign ref ----> ref={refName} ----- */}
            <input id="inp" type="text" placeholder="Moviename"  required ref={moviename}/>
            <input id="inp" type="text" placeholder="Hero" required ref={hero}/>
            <input id="inp" type="text" placeholder="Heroine" required ref={heroine}/>
            <input id="inp" type="text" placeholder="Director" required ref={director}/>
           
            <fieldset id="lang">
                <legend><h3 style={{color : "#0f3e62"}}>Languages</h3></legend>
                <input id="Kannada" type="checkbox" name="lang" value="kannada"/>  <label htmlFor="Kannada">Kannada</label>
                <input id="English" type="checkbox" name="lang" value="English"/>  <label htmlFor="English">English</label>
                <input id="Hindi" type="checkbox" name="lang" value="Hindi"/>      <label htmlFor="Hindi">Hindi</label>
                <input id="Tamil" type="checkbox" name="lang" value="Tamil"/>      <label htmlFor="Tamil">Tamil</label>
                <input id="Telugu" type="checkbox" name="lang" value="Telugu"/>    <label htmlFor="Telugu">Telugu</label>
                <input id="Kerala" type="checkbox" name="lang" value="Malayalam"/> <label htmlFor="Kerala">Malayalam</label>
            </fieldset>

            <input id="inp" type="text" placeholder="Genre" required ref={genre}/>
            <input id="inp" type="url" placeholder="Poster" required ref={poster}/>
            <input id="inp" type="url" placeholder="Trailer" required ref={trailer}/>
            <input id="inp" type="number" placeholder="Release" required min={1950} max={2024} ref={release}/>
            <input id="inp" type="number" placeholder="Rating" required min={1} max={10} step={0.1} ref={rating}/>
            <textarea name="" placeholder="Synopsis" id="area" required cols="70" rows="6" ref={synopsis}></textarea>

            <input id="submit" type="submit" value="Edit Movie" />

        </form>
    </div>
     );
}
 
export default Updatemovie;