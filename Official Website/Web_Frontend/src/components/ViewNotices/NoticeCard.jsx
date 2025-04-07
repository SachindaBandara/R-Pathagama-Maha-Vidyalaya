import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const NoticeCard = ({ 
  notice, 
  language,
  translations,
  staticContent,
  handleViewNotice,
  dateOptions
}) => {
  return (
    <motion.div
      className="bg-white rounded-md border overflow-hidden hover:shadow-md transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute top-4 right-4 bg-yellow-400 text-red-800 px-4 py-1 rounded-full">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span className="text-sm font-semibold">
              {new Date(notice.deadline).toLocaleDateString(
                language === 'si' ? 'si-LK' : 
                language === 'ta' ? 'ta-IN' : 'en-US',
                dateOptions
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-red-800 mb-4 mt-10 sm:mt-0">
          {notice.translatedTitle || notice.title}
        </h2>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">
              {translations.posted || staticContent.posted}{' '}
              {new Date(notice.postedDate).toLocaleDateString(
                language === 'si' ? 'si-LK' : 
                language === 'ta' ? 'ta-IN' : 'en-US',
                dateOptions
              )}
            </span>
          </div>
          <button
            onClick={() => handleViewNotice(notice.pdfLink)}
            className="flex items-center justify-center sm:justify-start space-x-2 bg-red-800 text-white px-4 sm:px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            <span className="text-sm">
              {translations.viewNotice || staticContent.viewNotice}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
