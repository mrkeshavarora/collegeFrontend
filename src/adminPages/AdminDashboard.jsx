import React from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';
import { FaUsers, FaBookOpen, FaCalendarAlt, FaImages } from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = React.useState({
        notices: 0,
        events: 0,
        gallery: 0,
        faculty: 0
    });

    const [noticesList, setNoticesList] = React.useState([]);
    const [eventsList, setEventsList] = React.useState([]);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const [notices, events, gallery, faculty] = await Promise.all([
                    axiosInstance.get('/notice/all'),
                    axiosInstance.get('/event/all'),
                    axiosInstance.get('/gallery/all'),
                    user?.role === 'admin' ? axiosInstance.get('/faculty/all') : Promise.resolve({ data: [] })
                ]);

                setStats({
                    notices: notices.data.length,
                    events: events.data.length,
                    gallery: gallery.data.length,
                    faculty: faculty.data.length
                });

                // Sort by createdAt descending and take top 4
                const sortedNotices = [...notices.data].sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                ).slice(0, 4);
                setNoticesList(sortedNotices);

                const sortedEvents = [...events.data].sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                ).slice(0, 4);
                setEventsList(sortedEvents);

            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            }
        };
        fetchStats();
    }, [user?.role]);

    return (
        <div className="p-10 bg-gray-50 min-h-screen  w-full">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#1C398E]">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2 text-lg uppercase tracking-wide">
                    {user?.role} Portal | Welcome back, <span className="text-blue-600 font-bold">{user?.name}</span>
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<FaBookOpen />} label="Total Notices" value={stats.notices} color="bg-blue-600" />
                <StatCard icon={<FaCalendarAlt />} label="Public Events" value={stats.events} color="bg-purple-600" />
                <StatCard icon={<FaImages />} label="Gallery Photos" value={stats.gallery} color="bg-emerald-600" />
                {user?.role === 'admin' && (
                    <StatCard icon={<FaUsers />} label="Total Faculty" value={stats.faculty} color="bg-orange-600" />
                )}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Recent Notices */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">Recent Notices</h3>
                    <div className="space-y-6">
                        {noticesList.length > 0 ? (
                            noticesList.map((notice) => (
                                <ActivityItem 
                                    key={notice._id} 
                                    text={notice.title} 
                                    time={new Date(notice.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })} 
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">No recent notices found.</p>
                        )}
                    </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">Recent Events</h3>
                    <div className="space-y-6">
                        {eventsList.length > 0 ? (
                            eventsList.map((event) => (
                                <ActivityItem 
                                    key={event._id} 
                                    text={event.title} 
                                    time={new Date(event.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })} 
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">No recent events found.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold">System Status</h3>
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 text-xs shadow-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold italic">All systems operational</span>
                    </div>
                </div>
                <p className="text-gray-400 text-xs">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 transition-all hover:shadow-md">
        <div className={`${color} text-white p-4 rounded-2xl shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{label}</p>
            <h4 className="text-3xl font-bold text-gray-800">{value}</h4>
        </div>
    </div>
);

const ActivityItem = ({ text, time }) => (
    <div className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
        <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full shrink-0"></div>
        <div>
            <p className="text-gray-700 font-medium leading-tight">{text}</p>
            <span className="text-gray-400 text-xs">{time}</span>
        </div>
    </div>
);

export default AdminDashboard;
