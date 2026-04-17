import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import ManageTable from '../components/manageTable/ManageTable'
import axiosInstance from '../services/axiosInstance'
import DialogBox from '../components/dialogBox/DialogBox'

const emptyForm = {
  field1: '',   // name
};

const ManageDepartment = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/department/all');
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = () => {
    setEditId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: formData.field1 };

      if (editId) {
        await axiosInstance.put(`/department/update/${editId}`, payload);
        alert("Department updated successfully!");
      } else {
        await axiosInstance.post('/department/create', payload);
        alert("Department added successfully!");
      }
      setShowModal(false);
      setFormData(emptyForm);
      setEditId(null);
      fetchDepartments();
    } catch (error) {
      console.error("Error saving department:", error);
      alert("Failed to save department. Please try again.");
    }
  };

  const handleEdit = (department) => {
    setEditId(department._id);
    setFormData({
      field1: department.name || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axiosInstance.delete(`/department/delete/${id}`);
        fetchDepartments();
        alert("Department deleted successfully!");
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Error deleting department.");
      }
    }
  };

  const filteredData = (Array.isArray(departmentData) ? departmentData : []).filter((dept) =>
    (dept?.name || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Departments</h1>
        <p className="text-gray-600 text-sm">Create and manage academic departments.</p>
      </div>

      <SearchBox
        placeholder="Search by department name..."
        btnName="Add New Department +"
        onClick={handleOpenModal}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
          Loading departments...
        </div>
      ) : (
        <ManageTable
          columns={["name"]}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DialogBox
        title="Department"
        fields={[
          { label: "Department Name", name: "field1" },
        ]}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleCreateDepartment}
        isEditing={!!editId}
      />
    </div>
  )
}

export default ManageDepartment
