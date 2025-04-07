import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import SectionTitle from "../components/Academic/SectionTitle";
import SectionDescription from "../components/Academic/SectionDescription";
import DividerLine from "../components/Academic/DividerLine";
import facultyImg from "../assets/ImageCarousel/Bg-1.jpg";
import admissionsImg from "../assets/ImageCarousel/Bg-2.jpg";
import curriculumImg from "../assets/ImageCarousel/Bg-3.jpg";

const sections = (langKey) => [
  {
    id: "faculty",
    title: lang[langKey]?.facultyTitle || lang.en.facultyTitle,
    description: lang[langKey]?.facultyDescription || lang.en.facultyDescription,
    image: facultyImg,
  },
  {
    id: "admissions",
    title: lang[langKey]?.admissionsTitle || lang.en.admissionsTitle,
    description: lang[langKey]?.admissionsDescription || lang.en.admissionsDescription,
    image: admissionsImg,
  },
  {
    id: "curriculum",
    title: lang[langKey]?.curriculumTitle || lang.en.curriculumTitle,
    description: lang[langKey]?.curriculumDescription || lang.en.curriculumDescription,
    image: curriculumImg,
  },
];

const Academic = () => {
  const langKey = useSelector((store) => store.config.lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-inter">
      {sections(langKey).map((section, index) => (
        <section
          key={section.id}
          className="relative min-h-screen flex flex-col justify-center text-white"
          style={{
            backgroundImage: `url(${section.image})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>

          {/* Section Title */}
          <SectionTitle title={section.title} />

          {/* Divider Line */}
          <DividerLine />

          {/* Section Description */}
          <SectionDescription description={section.description} />
        </section>
      ))}
    </div>
  );
};

export default Academic;