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
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">Recent Activities</h3>
                    <div className="space-y-6">
                        <ActivityItem text="New faculty member 'Dr. Sarah' added to CS dept." time="2 hours ago" />
                        <ActivityItem text="Annual Sports Meet scheduled for next month." time="5 hours ago" />
                        <ActivityItem text="Curriculum for 'Bio-Tech 2024' updated." time="Yesterday" />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">System Status</h3>
                    <div className="flex items-center gap-4 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-sm italic">All backend systems are operational</span>
                    </div>
                </div>
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
