import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
import { Episode } from './pages/episode';
import { NotFound } from './pages/notFound';
import { Search } from './pages/search';
import { Genre } from './pages/genre';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/anime/:slug' element={<Detail />}/>
        <Route path='/anime/:slug/:eps' element={<Episode />}/>
        <Route path='/genre' element={<Genre />}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
