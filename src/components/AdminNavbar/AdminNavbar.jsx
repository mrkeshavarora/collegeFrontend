import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FaChartLine,
    FaUsers,
    FaBookOpen,
    FaCalendarAlt,
    FaSignOutAlt,
    FaUserShield,
    FaBars,
    FaTimes,
    FaGraduationCap,
    FaGlobe
} from 'react-icons/fa';
import { useState } from 'react';

const AdminNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (

        <>

            {/* Top Navbar for Mobile/Dashboard */}
            <nav className="h-[10vh] w-full bg-white z-55  flex items-center px-6 fixed top-0 left-0  shadow-md ">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center justify-center p-2.5 bg-blue-900 text-white hover:bg-blue-800 rounded-lg transition-all shadow-sm"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
                <div className="ml-4 flex justify-between items-center w-full">
                    <span className="font-extrabold text-[#1C398E] text-lg tracking-tight">ADMIN PANEL</span>
                    <Link to="/" className="text-gray-500 hover:text-[#1C398E] text-sm font-bold flex items-center gap-2">
                        <FaGlobe /> View Website
                    </Link>
                </div>
            </nav>

            {/* Side Navigation */}
            <nav className={`bg-[#1C398E] text-white h-screen w-64 fixed left-0 top-0 flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-[10vh] flex items-center justify-center border-b border-white/10">
                    <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                        {/* <FaTimes size={24} /> */}
                    </button>
                    <span className="font-bold tracking-widest text-sm opacity-50 uppercase">Navigation</span>
                </div>
                <div className="p-8 border-b border-white/10 flex flex-col items-center">
                    <div className="bg-white/20 p-3 rounded-2xl mb-4">
                        <FaUserShield size={30} className="text-blue-300" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-center">Admin Portal</h2>
                    <p className="text-blue-300 text-xs mt-1 uppercase tracking-widest font-semibold">{user?.name || 'Authorized'}</p>
                </div>

                <div className="flex-1 py-10 px-4 space-y-2 overflow-y-auto">
                    <AdminLink to="/" icon={<FaGlobe />} label="Go to Website" onClick={() => setIsSidebarOpen(false)} />
                    <AdminLink to="/admin/dashboard" icon={<FaChartLine />} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />

                    {user?.role === 'admin' && (
                        <>
                            <AdminLink to="/admin/courses" icon={<FaGraduationCap />} label="Courses Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/managedepartments" icon={<FaBookOpen />} label="Departments Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/managefaculty" icon={<FaUsers />} label="Faculty Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/managenonteaching" icon={<FaUsers />} label="Non-Teaching Staff" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/college" icon={<FaCalendarAlt />} label="College Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/permissions" icon={<FaUserShield />} label="User Permissions" onClick={() => setIsSidebarOpen(false)} />
                        </>
                    )}

                    {(user?.role === 'admin' || user?.role === 'staff') && (
                        <>
                            <AdminLink to="/admin/managenotices" icon={<FaBookOpen />} label="Notices Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/events" icon={<FaCalendarAlt />} label="Events Management" onClick={() => setIsSidebarOpen(false)} />
                            <AdminLink to="/admin/gallery" icon={<FaCalendarAlt />} label="Gallery Management" onClick={() => setIsSidebarOpen(false)} />
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-3 rounded-xl transition-all font-semibold"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </nav>

            {/* Overlay for all screen sizes */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-all"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
};

const AdminLink = ({ to, icon, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-all text-gray-300 hover:text-white font-medium group"
    >
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        {label}
    </Link>
);

export default AdminNavbar;
