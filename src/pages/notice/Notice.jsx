import React, { useState, useEffect } from 'react';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap';
import NoticeCard from '../../smallComponents/noticeCard/NoticeCard';
import axiosInstance from '../../services/axiosInstance';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/notice/all');
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            <SmallBlueStrap 
                head="Notice Board" 
                line="Stay informed with the latest official announcements, circulars, and updates from the college administration." 
            />
            
            <div 
            className="px-4 md:px-10 max-w-7xl mx-auto relative z-40 -mt-15">
                <div 
               className=" flex flex-col items-center justify-center gap-2 w-auto">
                  {loading ? (
                        <div className="col-span-full py-20 text-center">
                            <div className="inline-block w-12 h-12 border-4 border-blue-100 border-t-[#1C398E] rounded-full animate-spin"></div>
                            <p className="mt-4 text-[#1C398E] font-bold">Synchronizing Board...</p>
                        </div>
                    ) : notices.length > 0 ? (
                        notices.map((notice) => (
                            <NoticeCard key={notice._id} notice={notice} />
                        ))

                    ) : (
                        <div className="col-span-full py-32 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
                            <p className="text-gray-400 font-medium">No active notices found at this moment.</p>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default Notice;
