import 'react';
import { Route, BrowserRouter, Routes, } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Academics from './components/Academics';
import News from './components/News';
import ContactUs from './components/ContactUs';
import Gallery from './components/Gallery';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/academics' element={<Academics />} />
        <Route path='/news' element={<News />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<ContactUs />} />
    
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;