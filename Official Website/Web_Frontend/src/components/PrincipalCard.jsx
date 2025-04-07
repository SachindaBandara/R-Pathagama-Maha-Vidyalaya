import React from "react";
import { motion } from "framer-motion";
import { principalsData } from "../data/principalsData";

// Duplicate the data array to enable seamless infinite scrolling.
const duplicatedPrincipals = [...principalsData, ...principalsData];

const PrincipalCards = () => {
  return (
    <div className="relative py-16">
      <div className="container mx-auto px-4">
        {/* Overflow-hidden container to mask the continuous scroll */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex space-x-8"
            // Animate from 0% to -50% of its width, then loop infinitely.
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedPrincipals.map((principal, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 md:w-80 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-white/10 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Image covering the entire card */}
                <div className="relative w-full h-full">
                  <motion.img
                    src={principal.image}
                    alt={principal.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Text overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">
                      {principal.name}
                    </h3>
                    <p className="text-gray-50 font-medium">
                      {principal.period}
                    </p>
                    <p className="text-gray-200 text-sm mt-2">
                      {principal.achievements}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalCards;