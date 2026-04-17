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
    const ugCourses = courses.filter(course => course.level === 'undergraduate');
    const pgCourses = courses.filter(course => course.level === 'postgraduate');

    return (
        <div className=" pb-20">
            <SmallBlueStrap head="Our Courses" line="Explore our wide range of academic programs designed for your success." />
            
            <div className="px-4 md:px-10 mt-10">
                <div className="max-w-8xl mx-auto">
                    {/* Undergraduate Section */}
                    {ugCourses.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-[#1C398E] mb-10 border-l-4 border-[#1C398E] pl-4">Undergraduate Courses</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-24 justify-items-center">
                                {ugCourses.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Postgraduate Section */}
                    {pgCourses.length > 0 && (
                        <div>
                            <h2 className="text-3xl font-bold text-[#1C398E] mb-10 border-l-4 border-[#1C398E] pl-4">Postgraduate Courses</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-24 justify-items-center">
                                {pgCourses.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Courses