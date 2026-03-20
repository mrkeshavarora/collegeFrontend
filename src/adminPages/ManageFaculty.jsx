import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import ManageTable from '../components/manageTable/ManageTable'
import axiosInstance from '../services/axiosInstance'
import DialogBox from '../components/dialogBox/DialogBox'

const emptyForm = {
  field1: '',   // name
  field2: '',   // department
  field3: '',   // qualification
  field4: '',   // expirence
  field5: '',   // subjects
  field6: '',   // phone
  field7: '',   // email
  field8: '',   // timmings
  field9: '',   // photo (existing URL for preview)
};

const ManageFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);  // actual File object
  const [editId, setEditId] = useState(null);

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
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setPhotoFile(files[0] || null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpenModal = () => {
    setEditId(null);
    setFormData(emptyForm);
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.field1);
      data.append('department', formData.field2);
      data.append('qualification', formData.field3);
      data.append('expirence', formData.field4);  // backend typo kept
      data.append('subjects', formData.field5);
      data.append('phone', formData.field6);
      data.append('email', formData.field7);
      data.append('timmings', formData.field8);
      if (photoFile) {
        data.append('photo', photoFile);
      }

      if (editId) {
        await axiosInstance.put(`/faculty/update/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Faculty updated successfully!");
      } else {
        await axiosInstance.post('/faculty/create', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Faculty added successfully!");
      }
      setShowModal(false);
      setFormData(emptyForm);
      setPhotoFile(null);
      setEditId(null);
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
      alert("Failed to save faculty. Please try again.");
    }
  };

  const handleEdit = (faculty) => {
    setEditId(faculty._id || faculty.id);
    setFormData({
      field1: faculty.name || '',
      field2: faculty.department || '',
      field3: faculty.qualification || '',
      field4: faculty.expirence || faculty.experience || '',
      field5: faculty.subjects || '',
      field6: faculty.phone || '',
      field7: faculty.email || '',
      field8: faculty.timmings || '',
      field9: faculty.photo || '',  // existing URL for preview
    });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await axiosInstance.delete(`/faculty/delete/${id}`);
        fetchFaculty();
        alert("Faculty deleted successfully!");
      } catch (error) {
        console.error("Error deleting faculty:", error);
        alert("Error deleting faculty.");
      }
    }
  };

  const filteredData = (Array.isArray(facultyData) ? facultyData : []).filter((faculty) =>
    (faculty?.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (faculty?.department || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (faculty?.qualification || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Faculty</h1>
        <p className="text-gray-600 text-sm">View and manage all faculty records in the system.</p>
      </div>

      <SearchBox
        placeholder="Search by name, department or qualification..."
        btnName="Add New Faculty +"
        onClick={handleOpenModal}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
          Loading faculty data...
        </div>
      ) : (
        <ManageTable
          columns={["photo", "name", "department", "qualification", "expirence", "subjects", "phone", "email", "timmings"]}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DialogBox
        title="Faculty"
        fields={[
          { label: "Name", name: "field1" },
          { label: "Department", name: "field2" },
          { label: "Qualification", name: "field3" },
          { label: "Experience", name: "field4", type: "number", min: "0" },
          { label: "Subjects", name: "field5" },
          { label: "Phone", name: "field6", type: "tel" },
          { label: "Email", name: "field7", type: "email" },
          { label: "Timings", name: "field8" },
          { label: "Faculty Photo", name: "field9", type: "file" },
        ]}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleCreateFaculty}
        isEditing={!!editId}
      />
    </div>
  )
}

export default ManageFaculty
