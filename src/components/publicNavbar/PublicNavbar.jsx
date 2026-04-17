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
  FaCalendarAlt,
  FaFileAlt,
  FaImages,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaHandsHelping,
  FaUsers
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
          <FaUniversity className="text-2xl md:text-3xl" />
          <h2 className="logo-text-full">DAV COLLEGE AMRITSAR</h2>
          <h2 className="logo-text-short">DAV</h2>
        </Link>
      </div>

      <ul className={`public-navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>
            <FaHome className="nav-link-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMobileMenu}>
            <FaInfoCircle className="nav-link-icon" />
            <span>About Us</span>
          </Link>
        </li>
        <li>
          <Link to="/courses" onClick={closeMobileMenu}>
            <FaBook className="nav-link-icon" />
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link to="/faculty" onClick={closeMobileMenu}>
            <FaUserTie className="nav-link-icon" />
            <span>Faculty</span>
          </Link>
        </li>
        <li>
          <Link to="/staff" onClick={closeMobileMenu}>
            <FaUsers className="nav-link-icon" />
            <span>Staff</span>
          </Link>
        </li>
        <li>
          <Link to="/events" onClick={closeMobileMenu}>
            <FaCalendarAlt className="nav-link-icon" />
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link to="/notice" onClick={closeMobileMenu}>
            <FaFileAlt className="nav-link-icon" />
            <span>Notice</span>
          </Link>
        </li>
        <li>
          <Link to="/gallery" onClick={closeMobileMenu}>
            <FaImages className="nav-link-icon" />
            <span>Gallery</span>
          </Link>
        </li>
        <li>
          <Link to="/ncc" onClick={closeMobileMenu}>
            <FaShieldAlt className="nav-link-icon" />
            <span>NCC</span>
          </Link>
        </li>
        <li>
          <Link to="/nss" onClick={closeMobileMenu}>
            <FaHandsHelping className="nav-link-icon" />
            <span>NSS</span>
          </Link>
        </li>

        {/* Mobile menu login/admin buttons */}
        <li className="mobile-only-login py-6 w-full px-6 flex flex-col gap-3 mobile-only mt-auto border-t border-gray-100">
          {user ? (
            <>
              {(user.role === 'admin' || user.role === 'staff') && (
                <Link to="/admin/dashboard" onClick={closeMobileMenu} className="py-2 px-4 bg-[#1C398E] text-white rounded-lg font-semibold text-center w-full block" style={{ color: "white" }}>
                  <FaChartLine /> Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white w-full p-3 rounded-xl text-center flex items-center justify-center gap-2 font-semibold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobileMenu} className="py-2 px-4 bg-[#1C398E] text-white rounded-lg font-semibold text-center w-full block" style={{ color: "white" }}>
              Login
            </Link>
          )}
        </li>
      </ul>

      <div className="login-btn flex gap-2 items-center desktop-only">
        {user ? (
          <>
            {(user.role === 'admin' || user.role === 'staff') && (
              <Link to="/admin/dashboard">
                <button className="bg-[#1C398E] text-white py-2 px-4 rounded-lg font-medium transition-all active:scale-95">Admin Panel</button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white border-none shadow-none py-2 px-3 md:px-5 rounded-lg text-sm transition-all active:scale-95 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="py-2 px-4 md:px-6 bg-[#1C398E] text-white rounded-lg font-semibold text-sm transition-all active:scale-95">Login</button>
          </Link>
        )}
      </div>

      <div className="mobile-menu-icon ml-2" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </nav>
  )
}

export default PublicNavbar