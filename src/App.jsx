import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AdminDashboard from './adminPages/AdminDashboard';

// Public Components & Pages
import PublicNavbar from './components/publicNavbar/PublicNavbar'
import Home from './pages/home/Home'
import PublicFooter from './components/publicFooter/PublicFooter'
import About from './pages/about/About'
import Courses from './pages/courses/Courses'
import Faculty from './pages/faculty/Faculty'
import Gallery from './pages/gallery/Gallery'
import Events from './pages/events/Events'
import Login from './pages/login/Login'
import CourseDetail from './pages/courseDetail/CourseDetail'
import FacultyDetail from './pages/facultyDetail/FacultyDetail'
import ManageFaculty from './adminPages/ManageFaculty';
import ManageNotices from './adminPages/ManageNotices';
import ManageEvent from './adminPages/ManageEvent';
import ManageCourse from './adminPages/ManageCourse';
import ManageCollege from './adminPages/ManageCollege';
import ManageGallery from './adminPages/ManageGallery';
import ManageDepartment from './adminPages/ManageDepartment';
import ManageNonTeachingFaculty from './adminPages/ManageNonTeachingFaculty';
import EventDetail from './pages/eventDetail/EventDetail';
import Notice from './pages/notice/Notice';
import NoticeDetail from './pages/noticeDetail/NoticeDetail';

import ManagePermissions from './adminPages/ManagePermissions';
import ChatBot from './components/ChatBot/ChatBot';
import Ncc from './pages/ncc/Ncc';
import Nss from './pages/nss/Nss';
import NonTeachingStaff from './pages/nonTeachingStaff/NonTeachingStaff';


// Custom Wrapper to switch layouts
const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  // If user is authorized and on admin path, show admin layout
  if ((user?.role === 'admin' || user?.role === 'staff') && isAdminPath) {
    return (
      <div className="flex">
        <AdminNavbar />
        <div className=" w-full mt-17  ">
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Admin only routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/admin/managefaculty" element={<ManageFaculty />} />
                <Route path="/admin/courses" element={<ManageCourse />} />
                <Route path="/admin/managedepartments" element={<ManageDepartment />} />
                <Route path="/admin/managenonteaching" element={<ManageNonTeachingFaculty />} />
                <Route path="/admin/college" element={<ManageCollege />} />
                <Route path="/admin/permissions" element={<ManagePermissions />} />
              </>
            )}

            {/* Admin and Staff routes */}
            {(user?.role === 'admin' || user?.role === 'staff') && (
              <>
                <Route path="/admin/managenotices" element={<ManageNotices />} />
                <Route path="/admin/events" element={<ManageEvent />} />
                <Route path="/admin/gallery" element={<ManageGallery />} />
              </>
            )}

            {/* Fallback for unauthorized sub-routes */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Otherwise show Public Layout
  return (
    <>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/faculty/:id" element={<FacultyDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/staff" element={<NonTeachingStaff />} />
        <Route path="/contact" element={<div className="p-20 text-center"><h2>Contact Us</h2></div>} />
        <Route path="/resources" element={<div className="p-20 text-center"><h2>Resources</h2></div>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ncc" element={<Ncc />} />
        <Route path="/nss" element={<Nss />} />
        {/* Redirect away from admin if not logged in or authorized */}
        <Route path="/admin/*" element={<Navigate to="/login" replace />} />
      </Routes>
      <PublicFooter />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppLayout />
      <ChatBot />
    </AuthProvider>

  );
}

export default App;
