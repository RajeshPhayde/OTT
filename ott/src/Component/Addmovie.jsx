import { useRef } from "react";
import { useNavigate } from "react-router-dom";


const Addmovie = () => {

    //useRef() hook --> 
    //declare ref ,  Assign ref ,  Access ref

    let navigate = useNavigate();

    //declare ref
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


    let handleMovie = (e)=>{
        e.preventDefault();  
        
        // create new movie object

        // Access ref
        let newmovie = {
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
                newmovie.languages.push( option[i].value );
           }
        }

        //  send movie object to the database
        fetch("http://localhost:4000/movies", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(newmovie)
        })
        .then(()=>{
            alert("New Movie added.");
            // window.location.reload();
            navigate("/");
        })

    }

    return ( 
        <div className="newMovie">
            <h1 style={{color : "#0f3e62"}}>Add a movie detail</h1><hr /><hr />
           
            <form onSubmit={handleMovie}>
                            {/* ----- Assign ref ----> ref={refName} ----- */}
                <input id="inp" type="text" placeholder="Enter movie name" required ref={moviename}/>
                <input id="inp" type="text" placeholder="Enter hero name" required ref={hero}/>
                <input id="inp" type="text" placeholder="Enter heroine name" required ref={heroine}/>
                <input id="inp" type="text" placeholder="Enter director name" required ref={director}/>
               
                <fieldset id="lang">
                    <legend><h3 style={{color : "#0f3e62"}}>Languages</h3></legend>
                    <input id="Kannada" type="checkbox" name="lang" value="kannada"/>  <label htmlFor="Kannada">Kannada</label>
                    <input id="English" type="checkbox" name="lang" value="English"/>  <label htmlFor="English">English</label>
                    <input id="Hindi" type="checkbox" name="lang" value="Hindi"/>      <label htmlFor="Hindi">Hindi</label>
                    <input id="Tamil" type="checkbox" name="lang" value="Tamil"/>      <label htmlFor="Tamil">Tamil</label>
                    <input id="Telugu" type="checkbox" name="lang" value="Telugu"/>    <label htmlFor="Telugu">Telugu</label>
                    <input id="Kerala" type="checkbox" name="lang" value="Malayalam"/> <label htmlFor="Kerala">Malayalam</label>
                </fieldset>

                <input id="inp" type="text" placeholder="Enter Genre" required ref={genre}/>
                <input id="inp" type="url" placeholder="Upload poster link" required ref={poster}/>
                <input id="inp" type="url" placeholder="Upload trailer link" required ref={trailer}/>
                <input id="inp" type="number" placeholder="Date of release" required min={1950} max={2024} ref={release}/>
                <input id="inp" type="number" placeholder="   Rating" required min={1} max={10} step={0.1} ref={rating}/>
                <textarea name="" placeholder="Synopsis" id="area" required cols="70" rows="6" ref={synopsis}></textarea>

                <input id="submit" type="submit" value="Add Movie" />

            </form>
        </div>
     );
}
 
export default Addmovie;