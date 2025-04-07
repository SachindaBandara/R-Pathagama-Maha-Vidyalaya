import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import lang from "../../utils/languageConstants";
import leadershipBg from "../../assets/Event1.jpg";
import PrincipalCards from "../PrincipalCard";

const LeadershipSection = () => {
  const langKey = useSelector((store) => store.config.lang);
  const translations = lang[langKey] || lang["en"];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${leadershipBg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto flex flex-col items-center text-center px-4 sm:px-6 md:px-10">
        <motion.h2
          className="text-2xl sm:text-4xl font-bold text-center mb-8 text-yellow-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {translations.leadershipTitle}
        </motion.h2>
        <PrincipalCards />
      </div>
    </section>
  );
};

export default LeadershipSection;