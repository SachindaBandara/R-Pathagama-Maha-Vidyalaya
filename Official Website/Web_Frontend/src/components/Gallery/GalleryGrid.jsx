import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const GalleryGrid = ({ events, viewText }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
      }}
    >
      {events.map((event, index) => (
        <EventCard key={event._id} event={event} viewText={viewText} />
      ))}
    </motion.div>
  );
};

export default GalleryGrid;