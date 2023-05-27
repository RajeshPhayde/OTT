import Addmovie from './Component/Addmovie';
import Favorites from './Component/Favorites';
import Home from './Component/Home';
import Moviedetails from './Component/Moviedetails';
import Navbar from './Component/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Component/Signup';
import Search from './Component/Search';
import Updatemovie from './Component/Updatemovie';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/addmovie' element={<Addmovie/>}/>
                <Route path="/moviedetails/:id" element={<Moviedetails/>}/>
                <Route path='/fav' element={<Favorites/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path="/search/:searchkey" element={<Search/>}/>
                <Route path="/update/:id" element={<Updatemovie/>}/>
            </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
