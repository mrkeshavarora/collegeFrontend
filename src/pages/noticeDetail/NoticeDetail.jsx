import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap';
import { FaCalendarAlt, FaArrowLeft, FaFileAlt, FaPrint, FaShareAlt } from "react-icons/fa";

const NoticeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNoticeDetail();
    }, [id]);

    const fetchNoticeDetail = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/notice/getSingle/${id}`);
            setNotice(response.data);
        } catch (error) {
            console.error("Error fetching notice detail:", error);
            // Fallback
            try {
                const allResponse = await axiosInstance.get('/notice/all');
                const found = allResponse.data.find(n => n._id === id);
                if (found) setNotice(found);
            } catch (err) {
                console.log("Could not find notice in fallback", err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-blue-50 border-t-[#1C398E] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-3xl font-bold text-[#1C398E]">Notice Not Found</h2>
                <button 
                    onClick={() => navigate('/notice')} 
                    className="mt-6 px-10 py-3 bg-[#1C398E] text-white rounded-full font-bold"
                >
                    Back to Notice Board
                </button>
            </div>
        );
    }

    const formattedDate = notice.date 
        ? new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Recent Update';

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
            <SmallBlueStrap head="Official Circular" line="Official announcement from the Office of the Principal." />

            <div className="px-4 mt-10 md:px-10 max-w-4xl mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-32 left-8 md:left-4 z-50 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm tracking-wide uppercase">Dismiss Detail</span>
                </button>

                {/* Notice Detail Card */}
                <div className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-4xl relative z-40 -mt-24 overflow-hidden border border-gray-100 p-8 md:p-16">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-10">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-red-50 text-red-600 rounded-3xl">
                                    <FaFileAlt size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Announcement Date</p>
                                    <p className="flex items-center gap-2 font-bold text-gray-800">
                                        <FaCalendarAlt className="text-red-400" size={14} />
                                        {formattedDate}
                                    </p>
                                </div>
                            </div>
                            {/* <div className="flex gap-3">
                                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors" title="Print Notice">
                                    <FaPrint size={18} />
                                </button>
                                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors" title="Share">
                                    <FaShareAlt size={18} />
                                </button>
                            </div> */}
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-wrap gap-2">
                                {notice.level && (
                                    <span className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest shadow-sm ${
                                        notice.level === 'high' ? 'bg-red-600 text-white' : 
                                        notice.level === 'low' ? 'bg-green-600 text-white' : 
                                        'bg-blue-600 text-white'
                                    }`}>
                                        {notice.level} Priority
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                                {notice.title}
                            </h1>
                            <div className="prose prose-lg max-w-none text-gray-600">
                                <p className="leading-relaxed text-xl font-light whitespace-pre-wrap">
                                    {notice.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 p-8 bg-blue-50/50 rounded-3xl border border-blue-100 text-center space-y-4">
                            <p className="text-sm font-medium text-blue-800">For further clarification regarding this circular, please visit the administrative office during working hours.</p>
                            <div className="flex justify-center flex-col items-center">
                                <div className="h-12 w-px bg-blue-200 my-2"></div>
                                <p className="font-black text-[#1C398E] uppercase tracking-tighter text-sm">Principal, DAV College</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;
