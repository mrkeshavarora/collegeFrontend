import React, { useEffect, useState } from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import axiosInstance from '../../services/axiosInstance';
import { FaPhone, FaEnvelope, FaUserTie } from 'react-icons/fa';

const NonTeachingStaff = () => {
    const [staffData, setStaffData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/nonteaching/all');
            setStaffData(response.data);
        } catch (error) {
            console.error("Error fetching non-teaching staff data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" pb-20">
            <SmallBlueStrap head="Non-Teaching Staff" line="Meet our dedicated support system that keeps the college running smoothly." />
            
            <div className="px-4 md:px-10 mt-10">
                <div className="max-w-8xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            Loading staff records...
                        </div>
                    ) : staffData.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {staffData.map((staff) => (
                                <div key={staff._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="h-64 relative overflow-hidden">
                                        <img 
                                            src={staff.photo || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"} 
                                            alt={staff.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            {staff.designation}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">{staff.name}</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaPhone className="text-blue-600" size={14} />
                                                <span className="text-sm">{staff.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaEnvelope className="text-blue-600" size={14} />
                                                <span className="text-sm truncate">{staff.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400 italic bg-white rounded-3xl border border-dashed border-gray-200">
                            No non-teaching staff records found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NonTeachingStaff
