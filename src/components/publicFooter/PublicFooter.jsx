import React from 'react'
import './PublicFooter.css'
import { FaUniversity } from "react-icons/fa";
import { Link } from 'react-router-dom'
const PublicFooter = () => {
    return (
        <>
            <footer className='footer'>
                <div className='footer-container'>
                    <div className="footer-left">
                        <h2 className='h2'><span><FaUniversity /></span>DAV College Amritsar</h2>
                        <p>A premier institution dedicated to  <br />   excellence in engineering and management education since 1995.</p>
                    </div>
                    <div className="footer-center">
                        <h3 className='h3'>Quick Links</h3>
                        <ul>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/about'><li>About</li></Link>
                            <Link to='/course'><li>Course</li></Link>
                            <Link to='/contact'><li>Contact</li></Link>
                            <Link to='/faculty'><li>Faculty</li></Link>
                            <Link to='/login'><li>Login</li></Link>
                        </ul>
                    </div>
                    <div className="footer-right">
                        <h3 className="h3">Contact US</h3>
                        <p>katra ahulwalia, Hathi Gate Amritsar, Punjab 143006</p>
                        <p>dav@College.com</p>
                        <p>+91 183 2222222</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} DAV College Amritsar. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default PublicFooter