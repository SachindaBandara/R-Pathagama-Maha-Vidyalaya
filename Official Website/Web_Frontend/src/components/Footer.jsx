import "react";
import School_logo from "../assets/SchoolLogos/School_white_logo.png";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const Footer = () => {
  const langKey = useSelector((store) => store.config.lang);
  const { home, about, academics, notice, gallery, contact, copyright } = lang[langKey] || lang["en"];

  return (
    <footer className="bg-red-custom text-white py-8 font-inter">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <img src={School_logo} alt="Logo" className="h-20 mx-auto mb-4 sm:mb-6" />
          <nav>
            <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-sm sm:text-base">
              <li>
                <a href="/" className="hover:text-yellow-custom transition duration-200">
                  {home}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-custom transition duration-200">
                  {about}
                </a>
              </li>
              <li>
                <a href="/academic" className="hover:text-yellow-custom transition duration-200">
                  {academics}
                </a>
              </li>
              <li>
                <a href="/notice" className="hover:text-yellow-custom transition duration-200">
                  {notice}
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-yellow-custom transition duration-200">
                  {gallery}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-custom transition duration-200">
                  {contact}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright Message */}
        <p className="text-xs sm:text-sm">{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
