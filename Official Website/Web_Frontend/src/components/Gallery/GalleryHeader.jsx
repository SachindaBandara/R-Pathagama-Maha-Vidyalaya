import React from 'react';
import LanguageSelector from '../ViewNotices/LanguageSelector';

const GalleryHeader = ({ gallery, language, setLanguage, loading }) => {
  return (
    <div className="flex justify-between items-center px-12">
      <span className="text-2xl font-bold">{gallery}</span>
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
        loading={loading}
      />
    </div>
  );
};

export default GalleryHeader;