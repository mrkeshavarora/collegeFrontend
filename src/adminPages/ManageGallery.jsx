import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import ManageTable from '../components/manageTable/ManageTable'
import axiosInstance from '../services/axiosInstance'
import DialogBox from '../components/dialogBox/DialogBox'

const emptyForm = {
    field1: '',  // title
    field2: '',  // location
    field3: '',  // timmings
    field4: '',  // images (file — kept for preview URL reference on edit)
};

const ManageGallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [imageFiles, setImageFiles] = useState([]);  // actual File[] objects
    const [editId, setEditId] = useState(null);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/gallery/all');
            setGalleryData(response.data);
        } catch (error) {
            console.error("Error fetching gallery data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleInputChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setImageFiles(Array.from(files));  // support multiple files
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleOpenModal = () => {
        setEditId(null);
        setFormData(emptyForm);
        setImageFiles([]);
        setShowModal(true);
    };

    const handleCreateGallery = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title',    formData.field1);
            data.append('location', formData.field2);
            data.append('timmings', formData.field3);
            imageFiles.forEach(file => data.append('images', file));

            if (editId) {
                await axiosInstance.put(`/gallery/update/${editId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert("Gallery updated successfully!");
            } else {
                await axiosInstance.post('/gallery/create', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert("Gallery created successfully!");
            }
            setShowModal(false);
            setFormData(emptyForm);
            setImageFiles([]);
            setEditId(null);
            fetchGallery();
        } catch (error) {
            console.error("Error saving gallery:", error);
            alert("Failed to save gallery. Please try again.");
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id || item.id);
        setFormData({
            field1: item.title    || '',
            field2: item.location || '',
            field3: item.timmings || '',
            field4: '',
        });
        setImageFiles([]);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this gallery?")) {
            try {
                await axiosInstance.delete(`/gallery/delete/${id}`);
                fetchGallery();
                alert("Gallery deleted successfully!");
            } catch (error) {
                console.error("Error deleting gallery:", error);
                alert("Error deleting gallery.");
            }
        }
    };

    const filteredData = (Array.isArray(galleryData) ? galleryData : []).filter((item) =>
        (item?.title    || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (item?.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return (
        <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
                <p className="text-gray-600 text-sm">View and manage all gallery items in the system.</p>
            </div>

            <SearchBox
                placeholder="Search by title or location..."
                btnName="Add New Gallery +"
                onClick={handleOpenModal}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
                    Loading gallery data...
                </div>
            ) : (
                <ManageTable
                    columns={["images", "title", "location", "timmings"]}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <DialogBox
                title="Gallery"
                fields={[
                    { label: "Title",                        name: "field1" },
                    { label: "Location",                     name: "field2" },
                    { label: "Timings",                      name: "field3" },
                    { label: "Images (select multiple)",     name: "field4", type: "file", multiple: true },
                ]}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleCreateGallery}
                isEditing={!!editId}
            />
        </div>
    );
};

export default ManageGallery;
