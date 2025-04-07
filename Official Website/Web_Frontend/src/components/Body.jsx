import { useEffect } from 'react';
import { motion } from 'framer-motion';
import image from "../assets/SchoolLogos/image1.png";
import AboutSection from './AboutSection';
import SchAbout from './SchAbout';
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const Body = () => {
  const langKey = useSelector((store) => store.config.lang);
  const { eLearningHeader, eLearningDescription, exploreLMS } = lang[langKey] || lang["en"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-inter">
      <AboutSection />
      <SchAbout />
      <section className="relative py-20 text-white" style={{ backgroundImage: `url(${image})`, backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-red-custom opacity-85"></div>
        <motion.div className="relative container mx-auto text-center px-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{eLearningHeader}</h2>
          <p className="max-w-3xl mx-auto mb-8 text-md md:text-lg leading-relaxed">{eLearningDescription}</p>
          <a href="/lms" className="inline-block bg-white text-red-custom font-semibold px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-yellow-custom hover:text-white">
            {exploreLMS} &rarr;
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Body;
