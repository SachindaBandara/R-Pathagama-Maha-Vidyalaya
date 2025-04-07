import React, { useEffect } from "react";
import MissionVision from "../components/About/MissionVision";
import HistorySection from "../components/About/HistorySection";
import LeadershipSection from "../components/About/LeadershipSection";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-inter">
      <MissionVision />
      <HistorySection />
      <LeadershipSection />
    </div>
  );
};

export default About;