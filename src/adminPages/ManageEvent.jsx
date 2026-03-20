import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import DialogBox from '../components/dialogBox/DialogBox';
import axiosInstance from '../services/axiosInstance';
import ManageTable from '../components/manageTable/ManageTable';

const emptyForm = {
    field1: '', // title
    field2: '', // location
    field3: '', // description
    field4: '', // images (preview/reference)
    field5: '', // date
    field6: '', // timmings
};

const ManageEvent = () => {
    const [editId, setEditId] = useState(null);
    const [eventData, setEventData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState(emptyForm);
    const [imageFiles, setImageFiles] = useState([]);

    const handleOpenModal = () => {
        setEditId(null);
        setFormData(emptyForm);
        setImageFiles([]);
        setShowModal(true);
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFiles(Array.from(files));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const fetchEvent = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/event/all');
            setEventData(response.data);
        } catch (error) {
            console.error("Error fetching event data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvent();
    }, [])

    const handleEdit = (event) => {
        setEditId(event._id || event.id);
        
        let formattedDate = event.date || '';
        try {
            if (formattedDate) {
                const d = new Date(formattedDate);
                if (!isNaN(d.getTime())) {
                    formattedDate = d.toISOString().split('T')[0];
                }
            }
        } catch (e) {} 

        setFormData({
            field1: event.title || '',
            field2: event.location || '',
            field3: event.description || '',
            field4: '', // reset file input
            field5: formattedDate,
            field6: event.timmings || ''
        });
        setImageFiles([]);
        setShowModal(true);
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Event?")) {
            try {
                await axiosInstance.delete(`/event/delete/${id}`);
                fetchEvent();
                alert("Event deleted successfully!");
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("Error deleting event.");
            }
        }
    }

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.field1);
            data.append('location', formData.field2);
            data.append('description', formData.field3);
            data.append('date', formData.field5);
            data.append('timmings', formData.field6);
            
            imageFiles.forEach(file => data.append('images', file));

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (editId) {
                await axiosInstance.put(`/event/update/${editId}`, data, config);
                alert("Event updated successfully!");
            } else {
                await axiosInstance.post(`/event/create`, data, config);
                alert("Event added successfully!");
            }
            setShowModal(false);
            setFormData(emptyForm);
            setImageFiles([]);
            setEditId(null);
            fetchEvent();
        } catch (error) {
            console.error("Error saving event:", error);
            const errorMsg = error.response?.data?.message || "Failed to save event.";
            alert(errorMsg);
        }
    }

    const filteredData = (Array.isArray(eventData) ? eventData : []).filter((event) => 
        (event?.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || 
        (event?.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return (
        <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
            <div className="">
                <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
                <p className="text-gray-600 text-sm">View and manage all events in the system.</p>
            </div>
            <SearchBox
                placeholder='Search by Event'
                btnName='Add New Event +'
                onClick={handleOpenModal}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                searchTerm={searchTerm}
            />
            {loading ? (
                <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
                    Loading event data...
                </div>
            ) : (
                <ManageTable
                    columns={["images", "title", "location", "timmings", "description"]}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            
            <DialogBox
                title="Event"
                fields={[
                    { label: "Event Title", name: "field1", required: true },
                    { label: "Location", name: "field2", required: true },
                    { label: "Date", name: "field5", type: "date", required: true },
                    { label: "Timings", name: "field6" },
                    { label: "Description", name: "field3", type: "textarea" },
                    { label: "Event Images", name: "field4", type: "file", multiple: true },
                ]}
                isOpen={showModal}
                formData={formData}
                onClose={() => setShowModal(false)}
                onChange={handleInputChange}
                onSubmit={handleCreateEvent}
                isEditing={!!editId}
            />
        </div>
    )
}

export default ManageEvent