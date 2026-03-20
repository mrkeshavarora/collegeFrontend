import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap';
import { FaPhone, FaEnvelope, FaBuilding, FaRegClock, FaArrowLeft, FaGraduationCap, FaChalkboardTeacher, FaHistory } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const FacultyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFacultyDetail();
    }, [id]);

    const fetchFacultyDetail = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/faculty/getSingle/${id}`);
            setFaculty(response.data);
        } catch (error) {
            console.error("Error fetching faculty detail:", error);
            try {
                const allResponse = await axiosInstance.get('/faculty/all');
                const found = allResponse.data.find(f => f._id === id);
                if (found) setFaculty(found);
            } catch (err) {
                console.log("Could not find faculty in fallback fetch", err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-50 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-[#1C398E] rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!faculty) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <div className="text-9xl text-gray-200 font-black italic">404</div>
                <h2 className="text-3xl font-bold text-[#1C398E] -mt-10">Faculty Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-6 px-10 py-3 bg-[#1C398E] text-white rounded-full font-bold">Return to Faculty</button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
            <SmallBlueStrap head={faculty.name} line={`Academic profile of ${faculty.name} from the ${faculty.department} department.`} />

            <div className="px-4 md:px-10 max-w-7xl mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-32 left-8 md:left-14 z-50 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm tracking-wide">BACK TO FACULTY</span>
                </button>

                {/* Profile Header Card */}
                <div className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] relative z-40 -mt-24 overflow-hidden border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        {/* Photo/Basic Info Sidebar */}
                        <div className="lg:w-1/3 bg-[#1C398E] p-10 md:p-14 text-white flex flex-col items-center text-center">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-linear-to-tr from-blue-400 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img
                                    src={faculty.photo || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"}
                                    alt={faculty.name}
                                    className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-8 border-white/10 shadow-2xl relative z-10"
                                />
                                <div className="absolute bottom-4 right-4 z-20 bg-green-500 p-2 rounded-full border-4 border-[#1C398E] shadow-lg">
                                    <MdVerified size={24} className="text-white" />
                                </div>
                            </div>

                            <div className="mt-8 space-y-2">
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{faculty.name}</h1>
                                <p className="text-blue-300 font-bold uppercase tracking-widest text-xs italic">{faculty.qualification}</p>
                            </div>

                            <div className="mt-12 w-full space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-300">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Email Address</p>
                                        <p className="text-sm font-medium truncate">{faculty.email || "faculty@college.edu"}</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-300">
                                        <FaPhone size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Contact Number</p>
                                        <p className="text-sm font-medium">{faculty.phone || "+91 1234567890"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10 w-full">
                                <button className="w-full bg-white text-[#1C398E] py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Schedule Meeting
                                </button>
                            </div>
                        </div>

                        {/* Detailed Content */}
                        <div className="lg:w-2/3 p-8 md:p-16 space-y-16">
                            {/* Academic Stats Box */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-16 border-b border-gray-100">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[#1C398E]">
                                        <FaBuilding />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Department</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-800">{faculty.department}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[#1C398E]">
                                        <FaHistory />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Experience</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-800">{faculty.expirence || faculty.experience} Years</p>
                                </div>
                                <div className="space-y-1 col-span-2 md:col-span-1">
                                    <div className="flex items-center gap-2 text-[#1C398E]">
                                        <FaRegClock />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Availability</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-800">{faculty.timmings || "9 AM - 5 PM"}</p>
                                </div>
                            </div>

                            {/* Main Sections */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-2 bg-[#1C398E] rounded-full"></div>
                                    <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Biography & Profile</h2>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#1C398E] first-letter:mr-3 first-letter:float-left">
                                    {faculty.name} is a distinguished faculty member in the {faculty.department} department. With over {faculty.expirence || faculty.experience} years of dedicated experience in both academic instruction and research, {faculty.name} has played a pivotal role in shaping the educational landscape of our institution. Specializing in highly complex subjects and innovative teaching methodologies.
                                </p>
                            </section>

                            <section className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-4xl bg-[#1C398E]/5 border border-[#1C398E]/10 space-y-4">
                                        <FaChalkboardTeacher size={32} className="text-[#1C398E]" />
                                        <h3 className="text-xl font-black text-[#1C398E] uppercase tracking-wide">Areas of Expertise</h3>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {(faculty.subjects || "No subjects specified").split(',').map((subject, idx) => (
                                                <span key={idx} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
                                                    {subject.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-4xl bg-[#1C398E]/5 border border-[#1C398E]/10 space-y-4">
                                        <FaGraduationCap size={32} className="text-[#1C398E]" />
                                        <h3 className="text-xl font-black text-[#1C398E] uppercase tracking-wide">Academic Research</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Actively involved in multi-disciplinary research projects focusing on modern industrial applications and student-led innovation workshops in {faculty.department}.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Quote Box */}
                            <div className="bg-linear-to-r from-[#1C398E] to-blue-700 p-10 rounded-4xl text-white italic text-lg relative overflow-hidden text-center group">
                                <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 -ml-10 -mt-10 rounded-full blur-2xl"></div>
                                <span className="relative z-10 font-light">"Education is not the learning of facts, but the training of the mind to think."</span>
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 -mr-10 -mb-10 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievement Grid */}
                <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Publications", val: "25+" },
                        { label: "PhD Students", val: "08" },
                        { label: "Conferences", val: "40+" },
                        { label: "Awards Won", val: "12" }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <h4 className="text-4xl font-black text-[#1C398E] mb-1">{stat.val}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyDetail;
