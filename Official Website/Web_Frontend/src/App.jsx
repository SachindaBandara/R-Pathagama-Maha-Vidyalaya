import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Academic from './pages/Academic';
import Header from './components/Header';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import EventDetailsPage from './pages/EventDetailsPage';
import appStore from './utils/appStore';
import Notice from './pages/Notice';

const App = () => {
  return (
    <Provider store={appStore}>
      <Router>
        {/* Header */}
        <Header />

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/academic" element={<Academic />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
