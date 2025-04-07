import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import School_logo from "../assets/SchoolLogos/School_white_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // Destructure language constants with a fallback to English
  const { header, home, about, academics, lms, notice, gallery, contact } = lang[langKey] || lang["en"];

  return (
    <>
      <header className="bg-red-custom text-white py-4 fixed w-full top-0 left-0 z-50 font-inter">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src={School_logo} alt="Logo" className="h-10 mr-6" />
            <h1 className="text-lg font-bold hidden sm:block">
              {header}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {/* Desktop Menu */}
            <ul className="hidden sm:flex items-center gap-6">
              <li>
                <Link to="/" className="rounded transition hover:text-yellow-custom">
                  {home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="rounded transition hover:text-yellow-custom">
                  {about}
                </Link>
              </li>
              <li>
                <Link to="/academic" className="rounded transition hover:text-yellow-custom">
                  {academics}
                </Link>
              </li>
              <li>
                <Link to="/lms" className="rounded transition hover:text-yellow-custom">
                  {lms}
                </Link>
              </li>
              <li>
                <Link to="/notice" className="rounded transition hover:text-yellow-custom">
                  {notice}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="rounded transition hover:text-yellow-custom">
                  {gallery}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="rounded transition hover:text-yellow-custom">
                  {contact}
                </Link>
              </li>

              {/* Language Selector */}
              <li>
                <select
                  value={langKey}
                  onChange={handleLanguageChange}
                  className="bg-red-custom text-white border border-gray-100 rounded px-2 py-1 focus:outline-none hover:border-yellow-custom"
                >
                  <option value="en">English</option>
                  <option value="sinhala">සිංහල</option>
                  <option value="tamil">தமிழ்</option>
                </select>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="sm:hidden relative z-20">
              <button
                className="cursor-pointer text-white text-3xl focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? "" : "☰"}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Mobile Dropdown Menu */}
        <div
          className={`sm:hidden fixed inset-0 bg-red-custom bg-opacity-95 z-50 flex items-center justify-center transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="absolute top-8 right-8">
            <button
              onClick={toggleMenu}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-custom text-2xl shadow-lg focus:outline-none hover:bg-yellow-custom"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Menu Container */}
          <div className="relative text-white rounded-lg p-6 w-full max-w-sm h-screen flex flex-col justify-center items-center">
            <ul className="flex flex-col items-center space-y-8 text-lg">
              <li>
                <Link to="/" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {about}
                </Link>
              </li>
              <li>
                <Link to="/academic" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {academics}
                </Link>
              </li>
              <li>
                <Link to="/lms" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {lms}
                </Link>
              </li>
              <li>
                <Link to="/notice" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {notice}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {gallery}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-custom" onClick={toggleMenu}>
                  {contact}
                </Link>
              </li>
              {/* Language Selector in Mobile Menu */}
              <li>
                <select
                  value={langKey}
                  onChange={handleLanguageChange}
                  className="bg-red-custom text-white border border-white rounded px-4 py-2 focus:outline-none hover:border-yellow-custom"
                >
                  <option value="en">English</option>
                  <option value="sinhala">සිංහල</option>
                  <option value="tamil">தமிழ்</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
