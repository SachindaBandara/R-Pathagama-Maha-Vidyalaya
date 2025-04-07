import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, viewText }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      className="group relative aspect-square rounded-xl overflow-hidden shadow-xl hover:shadow-xl transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={event.images[0]?.url || ''}
        alt={event.name}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2 translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">
        <span className="text-sm font-medium text-gray-200">
          {new Date(event.date).toLocaleDateString()}
        </span>
        <h3 className="text-xl font-bold">
          {event.translatedName || event.name}
        </h3>
        <button
          onClick={() => navigate(`/event/${event._id}`)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20"
        >
          {viewText}
        </button>
      </div>
    </motion.article>
  );
};

export default EventCard;