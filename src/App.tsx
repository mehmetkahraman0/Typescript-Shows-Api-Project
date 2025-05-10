import Navbar from './Components/Navbar';
import Shows from './Components/Shows';
import { Routes, Route, useLocation } from 'react-router-dom';
import FavoritesPage from './Pages/FavoritesPage';
import DetailsPage from './Pages/DetailsPage';

function App() {

  const location = useLocation();

  const isDetailsPage = location.pathname.match(/^\/\d+$/);
  const isFavoritesPage = location.pathname === "/favoriti";


  return (
    <>
      {(!isDetailsPage && !isFavoritesPage) && <Navbar />}
      <Routes>
        <Route path='/' element={<Shows />}></Route>
        <Route path='/favoriti' element={<FavoritesPage />}></Route>
        <Route path='/:id' element={<DetailsPage />}></Route>
      </Routes>
    </>
  )
}

export default App
