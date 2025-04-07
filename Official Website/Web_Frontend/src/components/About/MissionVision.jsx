import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import lang from "../../utils/languageConstants";
import Logo from "../../assets/SchoolLogos/School_logo.png";
import missionVisionBg from "../../assets/Event3.jpg";

const MissionVision = () => {
  const langKey = useSelector((store) => store.config.lang);
  const translations = lang[langKey] || lang["en"];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${missionVisionBg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>

      {/* Content Container */}
      <div className="relative container mx-auto flex flex-col items-center text-center px-4 sm:px-6 md:px-10">
        {/* School Logo and Title */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={Logo}
            alt="School Logo"
            className="hidden sm:block w-32 h-32 sm:w-48 sm:h-48 object-contain mb-4"
          />
          <motion.h1
            className="text-3xl sm:text-5xl font-bold mt-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {translations.aboutTitle}
          </motion.h1>
        </motion.div>

        {/* Mission and Vision */}
        <motion.div
          className="grid gap-8 w-full md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Mission */}
          <motion.div
            className="p-4 sm:p-8 bg-white/10 backdrop-blur-lg rounded-xl"
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 text-center">
              {translations.missionTitle}
            </h2>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-left">
              {translations.missionText}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="p-4 sm:p-8 bg-white/10 backdrop-blur-lg rounded-xl"
            variants={{
              hidden: { x: 50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-4 text-center">
              {translations.visionTitle}
            </h2>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-left">
              {translations.visionText}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;