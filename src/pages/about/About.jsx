import React, { useEffect, useState } from 'react'
import { AiOutlineAim } from "react-icons/ai";
import { FaEye, FaRegClock, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from '../../services/axiosInstance';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
const About = () => {
  const [collegeData, setCollegeData] = useState({
    name: '',
    description: '',
    mission: '',
    vision: '',
    timmings: '',
    email: '',
    phone: '',
    address: ''
  })
  useEffect(() => {
    fetchCollege();
  }, []);
  const fetchCollege = async () => {
    try {
      const response = await axiosInstance.get('/college/all');
      setCollegeData({
        name: response?.data[0]?.name,
        description: response?.data[0]?.description,
        mission: response?.data[0]?.mission,
        vision: response?.data[0]?.vision,
        timmings: response?.data[0]?.timmings,
        email: response?.data[0]?.email,
        phone: response?.data[0]?.phone,
        address: response?.data[0]?.address
      });
      // console.log(collegeData ? collegeData : "No Data");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-50 pb-20">
      <SmallBlueStrap head={`About ${collegeData.name || "Our College"}`} line="Building a legacy of excellence and innovation in education." />
      <div className="px-4 md:px-10">
        <div className="bg-white shadow-2xl rounded-3xl relative z-40 -mt-20 max-w-6xl mx-auto p-6 md:p-10 lg:p-16">
          {/* Main Content Area: Story + Image */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Story & Missions Sub-section */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#1C398E] mb-4 tracking-tight">Our Story</h2>
                <div className="h-1.5 w-20 bg-blue-600 rounded-full mb-6"></div>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
                  {collegeData.description || "A premier institution dedicated to excellence in engineering and management education since 1995. We are committed to nurturing talent and fostering innovation in every student, providing a world-class environment for technical and professional growth."}
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-3 transition-all hover:shadow-md hover:bg-white">
                  <AiOutlineAim className='bg-[#155DFC] text-white p-2 rounded-xl' size={"42px"} />
                  <h3 className='text-xl font-bold text-[#1C398E]'>Our Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{collegeData.mission || "To provide quality education and foster innovation in young minds through practical learning."}</p>
                </div>
                <div className="flex-1 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-3 transition-all hover:shadow-md hover:bg-white">
                  <FaEye className='bg-[#155DFC] text-white p-2 rounded-xl' size={"42px"} />
                  <h3 className='text-xl font-bold text-[#1C398E]'>Our Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{collegeData.vision || "To be a globally recognized institution for excellence in academic education and industrial research."}</p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://picsum.photos/seed/about/800/1000"
                  className='w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover'
                  alt="Our Campus"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Timings Section: Responsive Grid */}
          <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
              <FaRegClock className='bg-[#155DFC] text-white p-2.5 rounded-xl shrink-0' size={"46px"} />
              <div className="space-y-1">
                <h3 className='font-bold text-[#1C398E] text-lg'>Academic Hours</h3>
                <div className="text-gray-600 text-sm">
                  <p className="font-medium">Regular Hours</p>
                  <p>{collegeData.timmings || "9:00 AM - 5:00 PM"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
              <FaPhone className='bg-[#155DFC] text-white p-2.5 rounded-xl shrink-0' size={"46px"} />
              <div className="space-y-1">
                <h3 className='font-bold text-[#1C398E] text-lg'>Contact Details</h3>
                <div className="text-gray-600 text-sm">
                  <p className="font-medium flex items-center gap-1"><FaPhone size={12} /> {collegeData.phone || "+91 1234567890"}</p>
                  <p className="flex items-center gap-1"><FaEnvelope size={12} /> {collegeData.email || "info@college.edu"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 md:col-span-2 lg:col-span-1">
              <FaMapMarkerAlt className='bg-[#155DFC] text-white p-2.5 rounded-xl shrink-0' size={"46px"} />
              <div className="space-y-1">
                <h3 className='font-bold text-[#1C398E] text-lg'>Campus Address</h3>
                <div className="text-gray-600 text-sm">
                  <p>{collegeData.address || "123 Education Lane, Knowledge City, State, ZIP"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About