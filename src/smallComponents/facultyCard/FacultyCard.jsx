import React from "react";
import { useNavigate } from "react-router-dom";
import { TiShoppingBag } from "react-icons/ti";
import { FaBuilding } from "react-icons/fa";

import "./FacultyCard.css";
const FacultyCard = ({
  faculty = {},
  name = "Dr. John Smith",
  qulification = "Ph.D. in Computer Science",
  experience = "5",
  department = "Computer Science",
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (faculty._id) {
      navigate(`/faculty/${faculty._id}`);
    }
  };

  return (
    <div className="faculty-card group cursor-pointer" onClick={handleViewDetails}>
      <div className="faculty-image relative overflow-hidden">
        <img
          src={faculty.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-fmoGetp6VX_BcpKVw4GtJO2bvLR-fOA0Q&s"}
          alt={faculty.name || name}
          className="faculty-card-image transition-transform duration-500 group-hover:scale-110 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1C398E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="view-full-info absolute bottom-4  bg-white text-[#1C398E] px-5 py-2 rounded-full font-bold text-xs shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-all duration-300">
          View Full Profile
        </span>
      </div>
      <div className="faculty-details">
        <div>
          <h3 className="faculty-card-name group-hover:text-[#155DFC] transition-colors">{faculty.name || name}</h3>
          <p className="faculty-card-qualification italic text-gray-500">{faculty.qualification || qulification}</p>
        </div>

        <div className="faculty-card-info">
          <span className="faculty-card-experience">
            <TiShoppingBag size={20} className="text-[#155DFC]" />
            {faculty.expirence || faculty.experience || experience} Years
          </span>
          <p className="faculty-card-department">
            <FaBuilding size={18} className="text-[#155DFC]" />
            {faculty.department || department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
