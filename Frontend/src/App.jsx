import 'react';
import { Route, BrowserRouter, Routes,} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Academics from './components/Academics';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/academics' element={<Academics/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;