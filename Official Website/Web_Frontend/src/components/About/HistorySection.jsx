import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import lang from "../../utils/languageConstants";
import history from "../../assets/History.jpg";

const HistorySection = () => {
  const langKey = useSelector((store) => store.config.lang);
  const translations = lang[langKey] || lang["en"];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${history})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto flex flex-col items-center text-center px-4 sm:px-6 md:px-10">
        {/* History Title */}
        <motion.h2
          className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {translations.historyTitle}
        </motion.h2>

        {/* History Description */}
        <motion.div
          className="w-full max-w-3xl sm:max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-left">
            {translations.historyText}
          </p>
          <div className="mt-4 sm:mt-8 p-4 bg-yellow-400/10 rounded-lg border-l-4 border-yellow-400">
            <p className="text-gray-200 italic text-right text-sm sm:text-base">
              {translations.historyQuote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistorySection;