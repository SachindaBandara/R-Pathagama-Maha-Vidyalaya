import { motion } from "framer-motion";

const SectionDescription = ({ description }) => {
  return (
    <motion.div
      className="relative container mx-auto text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-white/90 drop-shadow-lg">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionDescription;