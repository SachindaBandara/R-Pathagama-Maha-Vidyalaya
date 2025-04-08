import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const NoticeCard = ({ notice, language, translations, staticContent, handleViewNotice, dateOptions }) => {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        {/* Deadline badge - redesigned as a horizontal banner */}
        <div className="flex items-center mb-4 bg-amber-50 border-l-4 border-yellow-500 px-4 py-2 rounded-r-md">
          <Calendar size={18} className="text-amber-800 mr-2" />
          <span className="text-sm font-medium text-amber-800">
            {translations.deadline || staticContent.deadline}{" "}
            <span className="font-semibold">
              {new Date(notice.deadline).toLocaleDateString(
                language === "si" ? "si-LK" : language === "ta" ? "ta-IN" : "en-US",
                dateOptions,
              )}
            </span>
          </span>
        </div>

        {/* Title - with a bottom border for visual separation */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
          {notice.translatedTitle || notice.title}
        </h2>

        {/* Footer section with posted date and button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-2 text-gray-400" />
            <span className="text-sm">
              {translations.posted || staticContent.posted}{" "}
              {new Date(notice.postedDate).toLocaleDateString(
                language === "si" ? "si-LK" : language === "ta" ? "ta-IN" : "en-US",
                dateOptions,
              )}
            </span>
          </div>

          <button
            onClick={() => handleViewNotice(notice.pdfLink)}
            className="group flex items-center space-x-2 bg-red-800 hover:bg-red-900 text-white px-5 py-2 rounded-md transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <span className="text-sm font-medium">{translations.viewNotice || staticContent.viewNotice}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default NoticeCard

