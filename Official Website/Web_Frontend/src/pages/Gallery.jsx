import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import GalleryHeader from '../components/Gallery/GalleryHeader';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import { translateText } from '../utils/translation';

const Gallery = () => {
  const [originalEvents, setOriginalEvents] = useState([]); // Store raw fetched events
  const [events, setEvents] = useState([]); // Displayed events (translated or original)
  const [language, setLanguage] = useState('en'); // Local state for event translation
  const [loading, setLoading] = useState(false); // Loading state for translations

  // Get the language key from Redux store and use it to select language constants
  const langKey = useSelector((store) => store.config.lang);
  const { gallery, viewText } = lang[langKey] || lang['en'];

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL; 

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}events`);
      setOriginalEvents(res.data);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Translate event names using the originalEvents as source
  const translateEventData = async () => {
    setLoading(true);
    try {
      const translatedEvents = await Promise.all(
        originalEvents.map(async (event) => {
          const translatedName = await translateText(event.name, language);
          return { ...event, translatedName };
        })
      );
      setEvents(translatedEvents);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // When language changes, update the displayed events based on originalEvents
  useEffect(() => {
    if (originalEvents.length > 0) {
      if (language === 'en') {
        // Revert to original events if English is selected
        setEvents(originalEvents);
      } else {
        // Otherwise, translate event names
        translateEventData();
      }
    }
  }, [language, originalEvents]);

  return (
    <motion.div
      className="min-h-screen flex flex-col my-28 font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <GalleryHeader
        gallery={gallery}
        language={language}
        setLanguage={setLanguage}
        loading={loading}
      />
      <section className="container mx-auto px-4 py-12 pb-20">
        <GalleryGrid events={events} viewText={viewText} />
      </section>
    </motion.div>
  );
};

export default Gallery;
