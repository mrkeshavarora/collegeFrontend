import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChevronRight, FaFileAlt } from 'react-icons/fa';
import './NoticeCard.css';
import { FaRegBell } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FiArrowRightCircle } from "react-icons/fi";

const NoticeCard = ({ notice }) => {
    const navigate = useNavigate();
    const formattedDate = notice.date
        ? new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Recent';
    console.log(notice);

    const getLevelStyle = (level) => {
        switch (level?.toLowerCase()) {
            case 'high':
                return {
                    badge: 'bg-red-50 text-red-700 border-red-100',
                    icon: 'text-red-600 bg-red-100',
                    arrow: 'text-red-600'
                };
            case 'medium':
                return {
                    badge: 'bg-yellow-50 text-yellow-700 border-yellow-100',
                    icon: 'text-yellow-600 bg-yellow-100',
                    arrow: 'text-yellow-600'
                };
            case 'low':
                return {
                    badge: 'bg-blue-50 text-blue-700 border-blue-100',
                    icon: 'text-blue-600 bg-blue-100',
                    arrow: 'text-blue-600'
                };
            default:
                return {
                    badge: 'bg-gray-50 text-gray-600 border-gray-100',
                    icon: 'text-gray-600 bg-gray-100',
                    arrow: 'text-blue-600'
                };
        }
    };

    const styles = getLevelStyle(notice.level);

    return (
        <div
            className="notice-card group cursor-pointer bg-white border-blue-950 shadow-2xl p-5 h-[160px] flex max-w-[800px] w-full relative overflow-hidden transition-all hover:shadow-blue-100"
            onClick={() => navigate(`/notice/${notice._id}`)}
        >
            <div className="notice-icon-wrapper flex items-center p-1">
                <FaRegBell className={`notice-icon text-5xl rounded-2xl p-3 transition-colors ${styles.icon}`} />
            </div>
            <div className="notice-content flex flex-col justify-around p-1 pl-5 w-full">
                <h3 className='text-2xl font-bold line-clamp-1'>{notice.title}</h3>
                <p className='text-gray-500 line-clamp-2 text-sm'>{notice.description}</p>
                <div className={`w-fit px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
                    {notice.level || 'medium'} Priority
                </div>
            </div>
            <div className="p-1 w-[220px] text-gray-500 flex items-center gap-2 justify-end">
                <CiCalendarDate size={20} />
                <span className="text-sm font-medium">{formattedDate}</span>
                <FiArrowRightCircle size={20} className={`group-hover:translate-x-1 transition-transform ${styles.arrow}`} />
            </div>
        </div>
    );
};

export default NoticeCard;
