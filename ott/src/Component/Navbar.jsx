import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

    let [searchkey , setSearchkey] = useState("");
    let [moviename, setMoviename] = useState([]);
    let [menu, setMenu] = useState(false);

    useEffect(()=>{
        fetch("http://localhost:4000/movies")
        .then((res)=>{return res.json()})
        .then((data)=>{
            let names = data.map( (m)=>{ return { moviename : m.moviename , id : m.id } } )

            let filteredName = names.filter((movie)=>{return movie.moviename.toLowerCase().includes(searchkey.toLowerCase())})
            setMoviename(filteredName);
        })
    },[searchkey])

    return ( 
        <nav>
            <div id="logo">
                
                <Link to="/"><h1>Movies</h1></Link>
                {/* Link tag bcoz it will not reload the application where as anchor tag will reload the movies */}
            </div>

            <div id="search-bar">
                <input type="text" placeholder="Search for movies" value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}}/>
                <button><Link to={`/search/${searchkey}`} onClick={()=>{setSearchkey("")}} >Search</Link></button>
                                                        {/* onClick={()=>{setSearchkey("")}} */}
            </div>
            
            <div id="add-movie">
                <div>
                    <Link to="/fav"><i id='wish' class='bx bxs-heart'></i></Link>
                </div>
                <div id="add1">
                    <Link to="/addmovie">Add Movie</Link>
                </div>
                <div id='add1'>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>

            <div id="hamberger" onClick={()=>{setMenu(!menu)}}>
                <span>
                    { !menu ? <i class='bx bx-menu' ></i> :
                             <i class='bx bx-menu-alt-right'></i>}
                </span>
                { menu && <div id="menu-list">
                        <div>
                            <Link to="/fav">Favourite</Link>
                        </div>
                        <div>
                            <Link to="/addmovie">Add Movie</Link>
                        </div>
                        <div>
                            <Link to="/signup">Signup</Link>
                        </div>  
                    </div>}

            </div>

           { searchkey!="" && <div className="suggestion-div">
                                <ul>
                                    {moviename.map((movie)=>{return (<Link onClick={()=>{ setSearchkey("")}} to={`/moviedetails/${movie.id}`}>
                                                                            <li>{movie.moviename}</li>
                                                                    </Link>)})}
                                                                    {/* onClick={(e)=>{setSearchkey(e.target.innertext)}} */}
                                                                    {/* onClick={()=>{setSearchkey(mname)}} */}
                                </ul>
                            </div>}
        </nav>
     );
}
 
export default Navbar;