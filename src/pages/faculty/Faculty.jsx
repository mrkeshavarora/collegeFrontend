import React, { useEffect, useState } from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import FacultyCard from '../../smallComponents/facultyCard/FacultyCard'
import axiosInstance from '../../services/axiosInstance';

const Faculty = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaculty();
    }, []);

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

    return (
        <div className=" pb-20">
            <SmallBlueStrap head="Our Faculty" line="Meet our team of experienced and dedicated faculty members." />
            <div className="px-4 md:px-10 ">
                <div className="rounded-3xl relative z-40 -mt-10 md:-mt-20 content-center top-5 gap-10 md:gap-24 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-h-[50vh]">
                    {loading ? (
                        <div className="col-span-full text-center py-20">Loading faculty...</div>
                    ) : (
                        facultyData.map((faculty) => (
                            <FacultyCard key={faculty._id} faculty={faculty} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Faculty