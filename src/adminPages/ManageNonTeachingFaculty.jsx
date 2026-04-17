import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import ManageTable from '../components/manageTable/ManageTable'
import axiosInstance from '../services/axiosInstance'
import DialogBox from '../components/dialogBox/DialogBox'

const emptyForm = {
  field1: '',   // name
  field2: '',   // designation
  field3: '',   // phone
  field4: '',   // email
  field5: '',   // photo (existing URL for preview)
};

const ManageNonTeachingFaculty = () => {
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
      const response = await axiosInstance.get('/nonteaching/all');
      setFacultyData(response.data);
    } catch (error) {
      console.error("Error fetching non-teaching faculty data:", error);
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
      data.append('designation', formData.field2);
      data.append('phone', formData.field3);
      data.append('email', formData.field4);
      if (photoFile) {
        data.append('photo', photoFile);
      }

      if (editId) {
        await axiosInstance.put(`/nonteaching/update/${editId}`, data);
        alert("Non-teaching faculty updated successfully!");
      } else {
        await axiosInstance.post('/nonteaching/create', data);
        alert("Non-teaching faculty added successfully!");
      }
      setShowModal(false);
      setFormData(emptyForm);
      setPhotoFile(null);
      setEditId(null);
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
      const msg = error.response?.data?.error || error.response?.data?.message || "Failed to save non-teaching faculty.";
      alert(msg);
    }
  };

  const handleEdit = (faculty) => {
    setEditId(faculty._id);
    setFormData({
      field1: faculty.name || '',
      field2: faculty.designation || '',
      field3: faculty.phone || '',
      field4: faculty.email || '',
      field5: faculty.photo || '',  // existing URL for preview
    });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        await axiosInstance.delete(`/nonteaching/delete/${id}`);
        fetchFaculty();
        alert("Deleted successfully!");
      } catch (error) {
        console.error("Error deleting faculty:", error);
        alert("Error deleting.");
      }
    }
  };

  const filteredData = (Array.isArray(facultyData) ? facultyData : []).filter((faculty) =>
    (faculty?.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (faculty?.designation || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Non-Teaching Faculty</h1>
        <p className="text-gray-600 text-sm">View and manage all non-teaching staff records.</p>
      </div>

      <SearchBox
        placeholder="Search by name or designation..."
        btnName="Add New Staff +"
        onClick={handleOpenModal}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
          Loading staff data...
        </div>
      ) : (
        <ManageTable
          columns={["photo", "name", "designation", "phone", "email"]}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DialogBox
        title="Non-Teaching Staff"
        fields={[
          { label: "Name", name: "field1" },
          { label: "Designation", name: "field2" },
          { label: "Phone", name: "field3", type: "tel" },
          { label: "Email", name: "field4", type: "email" },
          { label: "Staff Photo", name: "field5", type: "file" },
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

export default ManageNonTeachingFaculty
