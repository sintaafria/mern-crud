import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation exact="true"/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;