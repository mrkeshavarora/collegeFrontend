import React, { useEffect, useState } from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import FacultyCard from '../../smallComponents/facultyCard/FacultyCard'
import axiosInstance from '../../services/axiosInstance';

const Faculty = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All');

    useEffect(() => {
        fetchFaculty();
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get('/department/all');
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    }

    const fetchFaculty = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/faculty/all');
            setFacultyData(response.data);
        } catch (error) {
            console.error("Error fetching faculty data:", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredFaculty = selectedDepartment === 'All' 
        ? facultyData 
        : facultyData.filter(faculty => faculty.department === selectedDepartment);

    return (
        <div className=" pb-20">
            <SmallBlueStrap head="Our Faculty" line="Meet our team of experienced and dedicated faculty members." />
            
            <div className="px-4 md:px-10 mt-10">
                <div className="max-w-8xl mx-auto">
                    {/* Department Filter */}
                    <div className="mb-10 flex flex-col md:flex-row items-center gap-4 justify-center">
                        <label className="text-lg font-semibold text-gray-700">Filter by Department:</label>
                        <select 
                            value={selectedDepartment} 
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full md:w-64 shadow-sm"
                        >
                            <option value="All">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept._id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-24 justify-items-center">
                        {loading ? (
                            <div className="col-span-full text-center py-20">Loading faculty...</div>
                        ) : filteredFaculty.length > 0 ? (
                            filteredFaculty.map((faculty) => (
                                <FacultyCard key={faculty._id} faculty={faculty} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">No faculty members found in this department.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faculty