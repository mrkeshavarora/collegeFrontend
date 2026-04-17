import React, { useEffect, useState } from 'react'
import './PublicFooter.css'
import { FaUniversity, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axiosInstance from '../../services/axiosInstance';

const PublicFooter = () => {
    const [collegeData, setCollegeData] = useState({
        name: 'DAV College Amritsar',
        email: '',
        phone: '',
        address: '',
    })

    useEffect(() => {
        fetchCollege();
    }, []);

    const fetchCollege = async () => {
        try {
            const response = await axiosInstance.get('/college/all');
            if (response.data && response.data.length > 0) {
                setCollegeData({
                    name: response.data[0].name,
                    email: response.data[0].email,
                    phone: response.data[0].phone,
                    address: response.data[0].address,
                });
            }
        } catch (error) {
            console.log("Error fetching college data for footer:", error);
        }
    }

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className="footer-left">
                    <h2 className='h2'><span><FaUniversity /></span>{collegeData.name}</h2>
                    <p>A premier institution dedicated to excellence in education and holistic development.</p>
                </div>
                <div className="footer-center">
                    <h3 className='h3'>Quick Links</h3>
                    <ul>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/about'><li>About</li></Link>
                        <Link to='/courses'><li>Courses</li></Link>
                        <Link to='/faculty'><li>Faculty</li></Link>
                        <Link to='/login'><li>Login</li></Link>
                    </ul>
                </div>
                <div className="footer-right">
                    <h3 className="h3">Contact Us</h3>
                    <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-400" />
                            {collegeData.address}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" />
                            {collegeData.email }
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-blue-400" />
                            {collegeData.phone}
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {collegeData.name}. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default PublicFooter