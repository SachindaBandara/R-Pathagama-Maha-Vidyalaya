export const getDateOptions = (language) => ({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...(language === 'ta' ? { numberingSystem: 'tamldec' } : {})
  });