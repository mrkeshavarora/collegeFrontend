import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
import { FaRegClock, FaRupeeSign } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";

const CourseCard = ({ course = {} }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (course._id || course.id) {
      navigate(`/courses/${course._id || course.id}`);
    }
  };

  const defaultImage = "https://png.pngtree.com/background/20240523/original/pngtree-concept-of-learning-course-arrow-on-grunge-wall-background-photo-picture-image_9061702.jpg";

  return (
    <div className="course-card hove group" onClick={handleViewDetails}>
      <div className="course-image h-56 bg-[#1C398E] relative overflow-hidden">
        <img 
          src={course.image || defaultImage} 
          alt={course.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0A194E] via-[#0A194E]/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-white font-bold text-2xl leading-tight block line-clamp-2">
            {course.name || "Academic Program"}
          </span>
        </div>
      </div>
      
      <div className="course-details bg-white flex-1 flex flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
             <div className="flex items-center gap-1.5">
                <FaRegClock className="text-blue-500" />
                {course.duration || "3"} Years
             </div>
             <div className="flex items-center gap-1.5">
                <HiOutlineAcademicCap className="text-blue-500 text-lg" />
                {course.eligibility || "12th Pass"}
             </div>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
            {course.description || "Comprehensive curriculum designed to provide deep theoretical knowledge and practical industry skills."}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#1C398E] font-black text-xl">
             <FaRupeeSign size={14} />
             <span>{course.fee || "Market Value"}</span>
          </div>
          <button className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Explore Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
