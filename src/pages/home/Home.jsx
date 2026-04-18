import React, { useEffect, useState } from 'react'
import './Home.css'
import Button from '../../smallComponents/button/Button'
import { PiStudentFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import CourseCard from '../../smallComponents/courseCard/CourseCard';
import NoticeCard from '../../smallComponents/noticeCard/NoticeCard';
import { FaRegBell } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/axiosInstance';

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [noticeRes, courseRes] = await Promise.all([
          axiosInstance.get('/notice/all'),
          axiosInstance.get('/course/all')
        ]);
        // Get top 3 of each
        setNotices(noticeRes.data.slice(0, 3));
        setCourses(courseRes.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='hero-page'>
      
      <section className="hero">
          <div className="hero-content">
            <div className="hero-text-box">
              <h1>Empowering <br />Minds, <br />
                <span className='hero-span'>Shaping Futures.</span></h1>
              <p>A distinguished institution committed to academic excellence and holistic development, nurturing generations of scholars, leaders, and changemakers since its inception.</p>
              <div className="hero-btns">
                <div onClick={() => navigate('/courses')}>
                  <Button btnText="Explore Courses" />
                </div>
                <div onClick={() => navigate('/about')}>
                   <Button btnText="Learn More" variant="outline" />
                </div>
              </div>
            </div>
          </div>
      </section>
      
      <section className="home-stats content-center  mx-auto max-w-[1300px]">
        <div className="stats-cont-box">
          <PiStudentFill className='stats-icon' />
          <h3>9000+</h3>
          <p>Students</p>
        </div>
        <div className="stats-cont-box">
          <FaBookBookmark className='stats-icon' />
          <h3>40+</h3>
          <p>Courses</p>
        </div>
        <div className="stats-cont-box">
          <FaChalkboardTeacher className='stats-icon' />
          <h3>500+</h3>
          <p>Faculty</p>
        </div>
        <div className="stats-cont-box">
          <MdEmojiEvents className='stats-icon' />
          <h3>15+</h3>
          <p>Annual Events</p>
        </div>
      </section>

      <section className="home-featured-course content-center  mx-auto max-w-[1300px] ">
        <div className="home-featured-course-header">
          <h2>Featured Courses</h2>
          <p>Explore our flagship programs designed by industry experts to launch your career in top-tier organizations.</p>
        </div>
        <div className="home-featured-course-cards flex flex-wrap justify-center gap-10">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>)
          ) : (
            courses.map(course => <CourseCard key={course._id} course={course} />)
          )}
        </div>
        <div className="flex justify-center mt-12">
            <Link to="/courses" className="px-8 py-3 bg-[#1C398E] text-white rounded-full font-bold hover:bg-[#0A194E] transition-all shadow-lg hover:shadow-blue-200">
                View All Courses
            </Link>
        </div>
      </section>

      <section className="home-events-notices">
        <div className="content-center">
          <div className="home-notices mx-auto max-w-[1300px]">
            <div className="home-notice-head">
              <div className="home-notice-head-left">
                <FaRegBell />
                <h3>Latest Announcements</h3>
              </div>
              <div className="home-notice-head-right">
                <Link to="/notice">View All Board</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {loading ? (
                <div className="w-full py-10 text-center text-gray-400">Loading notices...</div>
              ) : notices.length > 0 ? (
                notices.map(notice => <NoticeCard key={notice._id} notice={notice} />)
              ) : (
                <div className="w-full py-10 text-center text-gray-400 bg-white rounded-2xl border border-dashed">No recent notices available.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
