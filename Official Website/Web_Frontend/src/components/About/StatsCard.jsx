import React from "react";
import { MdSchool, MdGroups, MdLibraryBooks } from "react-icons/md";

const StatsCard = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-lg rounded-lg">
      <div className="text-4xl text-yellow-400 mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-gray-200 text-sm">{label}</p>
    </div>
  );
};

export default StatsCard;