import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './PublicNavbar.css'
import { useAuth } from '../../context/AuthContext'
import {
  FaUniversity,
  FaHome,
  FaInfoCircle,
  FaBook,
  FaUserTie,
  FaUserPlus,
  FaFileAlt,
  FaImages,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  return (
    <nav className='public-navbar'>
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>
          <FaUniversity />
          <h2>DAV COLLEGE AMRITSAR</h2>
        </Link>
      </div>

      <ul className={`public-navbar-links ${isMobileMenuOpen ? 'active' : ''} items-center`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>
            <FaHome className="nav-link-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMobileMenu}>
            <FaInfoCircle className="nav-link-icon" />
            About Us
          </Link>
        </li>
        <li>
          <Link to="/courses" onClick={closeMobileMenu}>
            <FaBook className="nav-link-icon" />
            Courses
          </Link>
        </li>
        <li>
          <Link to="/faculty" onClick={closeMobileMenu}>
            <FaUserTie className="nav-link-icon" />
            Faculty
          </Link>
        </li>
        <li>
          <Link to="/events" onClick={closeMobileMenu}>
            <FaUserPlus className="nav-link-icon" />
            Events
          </Link>
        </li>
        <li>
          <Link to="/notice" onClick={closeMobileMenu}>
            <FaFileAlt className="nav-link-icon" />
            Notice
          </Link>
        </li>
        <li>
          <Link to="/gallery" onClick={closeMobileMenu}>
            <FaImages className="nav-link-icon" />
            Gallery
          </Link>
        </li>
        <li className="mobile-only-login mt-4 w-full px-4 flex flex-col gap-3">
          {user ? (
            <>
              {(user.role === 'admin' || user.role === 'staff') && (
                <Link to="/admin/dashboard" onClick={closeMobileMenu} className="bg-[#1C398E] text-white p-3 rounded-xl text-center flex items-center justify-center gap-2 font-semibold">
                  <FaChartLine /> Admin Panel
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 transition-colors text-white w-full p-3 rounded-xl text-center flex items-center justify-center gap-2 font-semibold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobileMenu} className="bg-[#1C398E] text-white p-3 rounded-xl text-center w-full font-semibold">
              Login
            </Link>
          )}
        </li>
      </ul>

      <div className="login-btn flex gap-4 items-center">
        {user ? (
          <>
            {(user.role === 'admin' || user.role === 'staff') && (
              <Link to="/admin/dashboard">
                <button className="bg-[#1C398E] text-white">Admin Panel</button>
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white border-none! shadow-none!"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        {!isMobileMenuOpen ? '☰' : '✕'}
      </div>

    </nav>
  )
}

export default PublicNavbar