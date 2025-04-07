import { motion } from "framer-motion";

const SectionTitle = ({ title }) => {
  return (
    <motion.div
      className="relative container mx-auto text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="inline-flex items-center justify-center space-x-4 mb-6">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">{title}</h2>
      </div>
    </motion.div>
  );
};

export default SectionTitle;