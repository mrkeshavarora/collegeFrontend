import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap';
import { FaRegClock, FaRupeeSign, FaGraduationCap, FaCheckCircle, FaLaptopCode, FaChartLine, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineSecurity } from "react-icons/md";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseDetail();
    }, [id]);

    const fetchCourseDetail = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/course/getSingle/${id}`);
            setCourse(response.data);
        } catch (error) {
            console.error("Error fetching course detail:", error);
            try {
                const allResponse = await axiosInstance.get('/course/all');
                const found = allResponse.data.find(c => c._id === id);
                if (found) setCourse(found);
            } catch (err) {
                console.log("Could not find course in fallback fetch", err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-[#1C398E] rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <div className="text-9xl text-gray-200 font-black italic">404</div>
                <h2 className="text-3xl font-bold text-[#1C398E] -mt-10">Oops! Course Hidden</h2>
                <p className="text-gray-500 max-w-md text-center">It seems this program has moved to another dimension or doesn't exist yet.</p>
                <button onClick={() => window.history.back()} className="mt-6 px-10 py-3 bg-[#1C398E] text-white rounded-full font-bold hover:shadow-2xl transition-all active:scale-95">Return to Programs</button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/30 min-h-screen pb-20 font-sans">
            <SmallBlueStrap head={course.name} line={`Elevate your career with our specialized ${course.level} program.`} />

            <div className="px-4 md:px-10 max-w-7xl mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-32 left-8 md:left-14 z-50 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm tracking-wide">BACK TO PROGRAMS</span>
                </button>

                {/* Main Program Header Card */}
                <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] relative z-40 -mt-24 overflow-hidden">
                    <div className="bg-[#1C398E] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="inline-block px-4 py-1 bg-blue-500/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-blue-100 border border-blue-400/20">
                                {course.level} Program
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{course.name}</h1>
                            <p className="text-blue-100/80 text-lg max-w-2xl font-light italic leading-relaxed">
                                "Empowering the next generation of industry leaders through excellence in {course.name} education."
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2">
                            <div className="text-3xl font-black text-white bg-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl border border-white/20">
                                ₹ {course.fee || "50,000"} <span className="text-sm font-normal text-blue-300">/ Year</span>
                            </div>
                            <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest">Investment in Future</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left Content: Description & Outcomes */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-gray-800">Program Overview</h2>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#1C398E] first-letter:mr-2">
                                    {course.description || "Our curriculum is meticulously designed to provide a perfect blend of theoretical knowledge and practical application. Students will engage in hands-on projects, industry-relevant case studies, and advanced research in their respective fields. We focus on developing analytical skills and professional ethics."}
                                </p>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-4xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                                    <FaLaptopCode className="text-blue-600 mb-4" size={32} />
                                    <h3 className="text-xl font-bold text-[#1C398E] mb-3">Core Learning</h3>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Advanced Methodologies</li>
                                        <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Real-world Simulations</li>
                                        <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Industry Capston Projects</li>
                                    </ul>
                                </div>
                                <div className="p-8 rounded-4xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                                    <FaChartLine className="text-blue-600 mb-4" size={32} />
                                    <h3 className="text-xl font-bold text-[#1C398E] mb-3">Career Prospects</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Graduates are highly sought after by top-tier global corporations, research labs, and innovative startups. 95% placement rate.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <div className="bg-[#1C398E] rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-blue-500/40"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-4">Why Choose This Program?</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex gap-4">
                                                <MdOutlineSecurity size={24} className="text-blue-400 shrink-0" />
                                                <p className="text-sm text-blue-100">Globally recognized certification and accreditation.</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <FaBookOpen size={24} className="text-blue-400 shrink-0" />
                                                <p className="text-sm text-blue-100">Modern library and high-tech lab resources.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar: Key Stats & Action */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 sticky top-10">
                                <h3 className="text-xl font-bold text-[#1C398E] mb-8 text-center uppercase tracking-widest ">Program Metrics</h3>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <FaRegClock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">Period</p>
                                                <p className="font-bold text-gray-800">{course.duration} Academic Years</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <HiOutlineAcademicCap size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">Entrance</p>
                                                <p className="font-bold text-gray-800">{course.eligibility}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <FaGraduationCap size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">Degree</p>
                                                <p className="font-bold text-gray-800">{course.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 space-y-4">
                                    <button className="w-full bg-[#1C398E] py-5 px-8 rounded-3xl text-white font-bold text-lg shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all">
                                        Apply for Admission
                                    </button>
                                    <button className="w-full bg-white border-2 border-gray-100 py-5 px-8 rounded-3xl text-gray-600 font-bold hover:bg-gray-50 transition-all">
                                        Download Syllabus
                                    </button>
                                </div>

                                <p className="text-[10px] text-center text-gray-400 mt-6 tracking-wide underline cursor-pointer">View Terms & Scholarship Policy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections Grid */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center p-8">
                        <h4 className="text-4xl font-black text-[#1C398E] mb-2">120+</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Industry Partners</p>
                    </div>
                    <div className="text-center p-8">
                        <h4 className="text-4xl font-black text-[#1C398E] mb-2">95%</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Placement Rate</p>
                    </div>
                    <div className="text-center p-8">
                        <h4 className="text-4xl font-black text-[#1C398E] mb-2">15k+</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Global Alumini</p>
                    </div>
                    <div className="text-center p-8">
                        <h4 className="text-4xl font-black text-[#1C398E] mb-2">1:15</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Faculty Ratio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
