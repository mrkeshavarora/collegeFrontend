import React, { useEffect, useState } from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import CourseCard from '../../smallComponents/courseCard/CourseCard'
import axiosInstance from '../../services/axiosInstance';
const Courses = () => {

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetchCourses();
    }, []);
    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get('/course/all');
            setCourses(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=" pb-20">
            <SmallBlueStrap head="Our Courses" line="Explore our wide range of academic programs designed for your success." />
            <div className="px-4 md:px-10 ">
                <div className="rounded-3xl relative z-40 -mt-10 md:-mt-20 top-5 gap-10 md:gap-24 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-h-[50vh] content-center">
                    {courses.map((course) => (
                        <CourseCard
                            key={course._id} course={course}
                        />  
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Courses