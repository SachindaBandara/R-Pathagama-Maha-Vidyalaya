import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoticeCard from '../components/ViewNotices/NoticeCard';
import LanguageSelector from '../components/ViewNotices/LanguageSelector';
import { translateText } from '../utils/translation';
import { getDateOptions } from '../utils/dateUtils';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';

const Notices = () => {
  const [originalNotices, setOriginalNotices] = useState([]);
  const [notices, setNotices] = useState([]);
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  // Use languageConstants for heading translation only
  const langKey = useSelector((store) => store.config.lang);
  const { notice:noticesText } = lang[langKey] || lang['en'];

  // Static content for notice cards
  const staticContent = {
    notices:"Notice",
    posted: "Posted:",
    viewNotice: "View Notice",
    deadline: "Deadline:"
  };

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API_URL}notices`);
        setOriginalNotices(response.data);
        if (language === 'en') setNotices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotices();
  }, [language]);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'en') {
        setTranslations({});
        setNotices(originalNotices);
        return;
      }
      if (!originalNotices.length) return;

      setLoading(true);
      const translatedStatic = {};
      for (const [key, value] of Object.entries(staticContent)) {
        translatedStatic[key] = await translateText(value, language);
      }

      const translatedNotices = await Promise.all(
        originalNotices.map(async (notice) => ({
          ...notice,
          translatedTitle: await translateText(notice.title, language)
        }))
      );

      setTranslations(translatedStatic);
      setNotices(translatedNotices);
      setLoading(false);
    };

    loadTranslations();
  }, [language, originalNotices]);

  const sortedNotices = [...notices].sort((a, b) =>
    new Date(b.postedDate) - new Date(a.postedDate)
  );

  const handleViewNotice = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  return (
    <div className="min-h-screen my-28 font-inter">
      <div className="flex justify-between items-center px-12 mb-8">
        <span className="text-2xl font-bold">{noticesText}</span>
        <LanguageSelector 
          language={language}
          setLanguage={setLanguage}
          loading={loading}
        />
      </div>

      {loading && (
        <div className="text-center py-8">Loading translations...</div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {sortedNotices.map((notice, index) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              language={language}
              translations={translations}
              staticContent={staticContent}
              handleViewNotice={handleViewNotice}
              dateOptions={getDateOptions(language)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
