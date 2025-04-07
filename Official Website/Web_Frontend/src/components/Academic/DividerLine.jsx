import { motion } from "framer-motion";

const DividerLine = () => {
  return (
    <motion.div
      className="w-16 h-1 bg-yellow-500 mb-8 mx-auto"
      initial={{ scaleX: 0.2 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    ></motion.div>
  );
};

export default DividerLine;