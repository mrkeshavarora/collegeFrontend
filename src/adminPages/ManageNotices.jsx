import React, { useEffect, useState } from 'react'
import SearchBox from '../smallComponents/searchBox/SearchBox'
import ManageTable from '../components/manageTable/ManageTable'
import axiosInstance from '../services/axiosInstance'
import { FaTimes } from 'react-icons/fa'
import DialogBox from '../components/dialogBox/DialogBox'

const ManageNotices = () => {
    const [noticeData, setNoticeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData2, setFormData2] = useState({
        field1: '',
        field1Type:'text',
        field2: '',
        field2Type:'text',
        field3: '',
        field3Type:'text',
        field4: 'medium', // Default level
        field4Type:'text',
    });
    const [editId, setEditId] = useState(null);

    const fetchNotice = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/notice/all');
            setNoticeData(response.data);
        } catch (error) {
            console.error("Error fetching notice data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotice();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
    };

    const handleOpenModal = () => {
        setEditId(null);
        setFormData2({ field1: '', field2: '', field3: '', field4: 'medium' });
        setShowModal(true);
    }

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { 
                title: formData2.field1, 
                date: formData2.field2, 
                description: formData2.field3,
                level: formData2.field4
            };

            if (editId) {
                await axiosInstance.put(`/notice/update/${editId}`, dataToSend);
                alert("Notice updated successfully!");
            } else {
                await axiosInstance.post('/notice/create', dataToSend);
                alert("Notice added successfully!");
            }
            setShowModal(false);
            setFormData2({ field1: '', field2: '', field3: '', field4: 'medium' });
            setEditId(null);
            fetchNotice();
        } catch (error) {
            console.error("Error saving notice:", error);
            alert("Failed to save notice. Please try again.");
        }
    };

    const handleEdit = (notice) => {
        setEditId(notice._id || notice.id);

        let formattedDate = notice.date || '';
        try {
            if (formattedDate) {
                const d = new Date(formattedDate);
                if (!isNaN(d.getTime())) {
                    formattedDate = d.toISOString().split('T')[0];
                }
            }
        } catch (e) {}

        setFormData2({
            field1: notice.title || '',
            field2: formattedDate,
            field3: notice.description || '',
            field4: notice.level || 'medium'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            try {
                await axiosInstance.delete(`/notice/delete/${id}`);
                fetchNotice();
                alert("Notice deleted successfully!");
            } catch (error) {
                console.error("Error deleting notice:", error);
                alert("Error deleting notice.");
            }
        }
    };

    const filteredData = (Array.isArray(noticeData) ? noticeData : []).filter((notice) => 
        (notice?.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || 
        (notice?.date || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return (
        <div className='p-5 bg-[#f5f4f4] flex flex-col gap-5 min-h-screen relative'>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Notices</h1>
                <p className="text-gray-600 text-sm">View and manage all notices in the system.</p>
            </div>

            <SearchBox
                placeholder="Search by title or date..."
                btnName="Add New Notice +"
                onClick={handleOpenModal}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
                    Loading notice data...
                </div>
            ) : (
                <ManageTable
                    columns={["title", "date", "description", "level"]}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <DialogBox
                title="Notice"
                fields={[
                    { label: "Notice Title", name: "field1" },
                    { label: "Date", name: "field2", type: "date" },
                    { label: "Description", name: "field3", type: "textarea" },
                    { 
                        label: "Priority Level", 
                        name: "field4", 
                        type: "select", 
                        options: [
                            { label: "High", value: "high" },
                            { label: "Medium", value: "medium" },
                            { label: "Low", value: "low" }
                        ] 
                    }
                ]}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                formData={formData2} 
                onChange={handleInputChange}
                onSubmit={handleCreateNotice}
                isEditing={!!editId}
            />
        </div>
    )
}

export default ManageNotices
