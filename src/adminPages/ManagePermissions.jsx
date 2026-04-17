import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { FaUserShield, FaUserEdit, FaUserSlash } from 'react-icons/fa';
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";

const ManagePermissions = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editStates, setEditStates] = useState({});
    const [showPasswordMap, setShowPasswordMap] = useState({}); // Tracking which rows show password

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/user/all');
            setUsers(response.data);
            
            const initialStates = {};
            const initialVisibility = {};
            response.data.forEach(u => {
                initialStates[u._id] = {
                    role: u.userType || 'faculity',
                    password: u.password || '' // Showing existing plain text password
                };
                initialVisibility[u._id] = false;
            });
            setEditStates(initialStates);
            setShowPasswordMap(initialVisibility);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const togglePasswordVisibility = (userId) => {
        setShowPasswordMap(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const handleInputChange = (userId, field, value) => {
        setEditStates(prev => ({
            ...prev,
            [userId]: { ...prev[userId], [field]: value }
        }));
    };

    const handleUpdate = async (userId) => {
        const { role, password } = editStates[userId];
        const updateData = { 
            userType: role,
            password: password // Updated as plain text
        };

        try {
            await axiosInstance.put(`/user/update/${userId}`, updateData);
            alert("User updated successfully!");
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user");
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen w-full">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#1C398E]">Security & Permissions</h1>
                <p className="text-gray-500 mt-2 text-lg italic">Manage access levels and view plain-text credentials.</p>
            </header>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-900 overflow-auto max-h-[70vh]">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-[#1C398E] text-white">
                        <tr>
                            <th className="px-6 py-5 font-bold uppercase text-sm regular tracking-wider">User Profile</th>
                            <th className="px-6 py-5 font-bold uppercase text-sm regular tracking-wider">Access Level</th>
                            <th className="px-6 py-5 font-bold uppercase text-sm regular tracking-wider text-center">Plain Text Password</th>
                            <th className="px-6 py-5 font-bold uppercase text-sm regular tracking-wider text-center">Save Changes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Synchronizing user data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : users.map((u) => (
                            <tr key={u._id} className="hover:bg-blue-50/30 transition-all duration-200">
                                <td className="px-6 py-6">
                                    <div className="font-bold text-gray-800 text-lg">{u.name}</div>
                                    <div className="text-gray-400 text-sm flex items-center gap-1">
                                        <IoMailOutline /> {u.email}
                                    </div>
                                </td>
                                <td className="px-6 py-6 border-l border-gray-50">
                                    <select 
                                        value={editStates[u._id]?.role}
                                        onChange={(e) => handleInputChange(u._id, 'role', e.target.value)}
                                        disabled={u.email === 'admin@gmail.com'}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-gray-700"
                                    >
                                        <option value="admin">Full Admin Authority</option>
                                        <option value="staff">Staff (Maintenance Only)</option>
                                        <option value="faculity">Regular Faculty Member</option>
                                    </select>
                                </td>
                                <td className="px-6 py-6 border-l border-gray-50">
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <IoLockClosedOutline size={18} />
                                        </span>
                                        <input 
                                            type={showPasswordMap[u._id] ? "text" : "password"}
                                            value={editStates[u._id]?.password || ''}
                                            onChange={(e) => handleInputChange(u._id, 'password', e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono tracking-wider"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => togglePasswordVisibility(u._id)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            {showPasswordMap[u._id] ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-center border-l border-gray-50">
                                    <button 
                                        onClick={() => handleUpdate(u._id)}
                                        className="bg-[#1C398E] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2 mx-auto"
                                    >
                                        <FaUserShield size={18} />
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-8 flex items-center gap-3 bg-red-50 p-6 rounded-2xl border border-red-100 text-red-800">
                <div className="bg-red-600 text-white p-2 rounded-lg">⚠️</div>
                <p className="text-sm font-bold">
                    Plain Text Visibility Enabled: All user passwords are currently stored and displayed in readable format.
                </p>
            </div>
        </div>
    );
};

export default ManagePermissions;
