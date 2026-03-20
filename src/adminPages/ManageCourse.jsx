import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import DialogBox from '../components/dialogBox/DialogBox';
import axiosInstance from '../services/axiosInstance';
import ManageTable from '../components/manageTable/ManageTable';

const ManageCourse = () => {
    const [editId, setEditId] = useState(null);
    const [courseData, setCourseData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: 'undergraduate' });
    const [photoFile, setPhotoFile] = useState(null);
    
    const handleOpenModal = () => {
        setEditId(null);
        setShowModal(true);
        setFormData({ field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: 'undergraduate' });
        setPhotoFile(null);
    }
    
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setPhotoFile(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/course/all');
            setCourseData(response.data);
        } catch (error) {
            console.error("Error fetching course data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    const handleEdit = (course) => {
        setEditId(course._id || course.id);
        
        setFormData({
            field1: course.name || course.courseName || '',
            field2: course.duration || '',
            field3: course.eligibility || '',
            field4: course.fee || '',
            field5: course.description || '',
            field6: course.photo || '',
            field7: course.level || 'undergraduate'
        });
        setPhotoFile(null);
        setShowModal(true);
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Course ?")) {
            try {
                await axiosInstance.delete(`/course/delete/${id}`);
                fetchCourse();
                alert("Course deleted successfully!");
            } catch (error) {
                console.error("Error deleting course:", error);
                alert("Error deleting course.");
            }
        }
    }

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.field1);
            data.append('level', formData.field7);
            
            // Only append optional fields if they have values to avoid backend validation issues
            if (formData.field2) data.append('duration', formData.field2);
            if (formData.field3) data.append('eligibility', formData.field3);
            if (formData.field4 && formData.field4 !== '') data.append('fee', Number(formData.field4));
            if (formData.field5) data.append('description', formData.field5);
            
            if (photoFile) {
                data.append('photo', photoFile);
            }

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (editId) {
                await axiosInstance.put(`/course/update/${editId}`, data, config);
                alert("Course updated successfully!");
            } else {
                await axiosInstance.post(`/course/create`, data, config);
                alert("Course added successfully!");
            }
            setShowModal(false);
            setFormData({ field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: 'undergraduate' });
            setPhotoFile(null);
            setEditId(null);
            fetchCourse();
        } catch (error) {
            console.error("Error saving course:", error);
            const errorMsg = error.response?.data?.message || error.response?.data || error.message || "Failed to save course. Please check if all required fields are filled.";
            alert(errorMsg);
        }
    }

    const filteredData = (Array.isArray(courseData) ? courseData : []).filter((course) => 
        (course?.name || course?.courseName || '').toLowerCase().includes((searchTerm || '').toLowerCase()) 
    );

    return (
        <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
            <div className="">
                <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
                <p className="text-gray-600 text-sm">View and manage all courses in the system.</p>
            </div>
            <SearchBox
                placeholder='Search by Course Name'
                btnName='Add New Course +'
                onClick={handleOpenModal}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                searchTerm={searchTerm}
            />
            {loading ? (
                <div>
                    <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
                        Loading course data...
                    </div>
                </div>
            ) : (
                <ManageTable
                    columns={["photo", "name", "level", "duration", "eligibility", "fee", "description"]}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )
            }
            <DialogBox
                title="Course"
                fields={[
                    { label: "Course Name", name: "field1", required: true },
                    { label: "Level", name: "field7", type: "radio", options: [
                        { label: 'Undergraduate', value: 'undergraduate' },
                        { label: 'Postgraduate', value: 'postgraduate' }
                    ], required: true },
                    { label: "Duration", name: "field2" },
                    { label: "Eligibility", name: "field3" },
                    { label: "Fee", name: "field4", type: "number" },
                    { label: "Description", name: "field5", type: "textarea" },
                    { label: "Course Photo", name: "field6", type: "file" }
                ]}
                isOpen={showModal}
                formData={formData}
                onClose={() => setShowModal(false)}
                onChange={handleInputChange}
                onSubmit={handleCreateCourse}
                isEditing={!!editId}
            />
        </div>
    )
}

export default ManageCourse
