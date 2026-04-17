import React, { useState, useEffect } from 'react'
import Input from '../smallComponents/input/Input'
import { FaRegBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdOutlineFlag, MdOutlineRemoveRedEye } from "react-icons/md";
import axiosInstance from '../services/axiosInstance';

const ManageCollege = () => {
    const [collegeData, setCollegeData] = useState({
        name: '',
        description: '',
        mission: '',
        vision: '',
        timmings: '',
        email: '',
        phone: '',
        address: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [hasExisting, setHasExisting] = useState(false);

    const fetchCollege = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/college/all');
            if (response.data && Object.keys(response.data).length > 0) {
                setCollegeData({
                    name: response.data[0].name || '',
                    description: response.data[0].description || '',
                    mission: response.data[0].mission || '',
                    vision: response.data[0].vision || '',
                    timmings: response.data[0].timmings || '',
                    email: response.data[0].email || '',
                    phone: response.data[0].phone || '',
                    address: response.data[0].address || ''
                });
                setHasExisting(true);
                // console.log("collegeData",collegeData.name);
            }
        } catch (error) {
            console.log('No existing college data or error:', error);
            setHasExisting(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollege();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollegeData(prev => ({ ...prev, [name]: value }));
        console.log(collegeData);
        
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const formData = new FormData();
            Object.keys(collegeData).forEach(key => {
                formData.append(key, collegeData[key]);
            });
            if (imageFile) {
                formData.append('image', imageFile);
            }
            await axiosInstance.put('/college/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccessMsg('✅ College data updated successfully!');
        } catch (error) {
            console.error('Error saving college data:', error);
            setErrorMsg('❌ Failed to save college data. Please try again.');
        } finally {
            setSaving(false);
            setTimeout(() => { setSuccessMsg(''); setErrorMsg(''); }, 4000);
        }
    };

    if (loading) {
        return (
            <div className='p-5 bg-[#f5f4f4] flex flex-col gap-10 min-h-screen relative lg:px-25 lg:pt-10'>
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Manage College</h1>
                    <p className="text-gray-600 text-sm">View and manage all college records in the system.</p>
                </div>
                <div className="bg-white p-10 rounded-lg text-center text-gray-500 shadow-sm border border-gray-100">
                    Loading college data...
                </div>
            </div>
        );
    }

    return (
        <div className='p-5 bg-[#f5f4f4] flex flex-col gap-10 min-h-screen relative lg:px-25 lg:pt-10'>
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Manage College</h1>
                <p className="text-gray-600 text-sm">View and manage all college records in the system.</p>
            </div>

            {/* Success / Error Banner */}
            {successMsg && (
                <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                    {successMsg}
                </div>
            )}
            {errorMsg && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                    {errorMsg}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                {/* Section 1: Basic Info + Mission & Vision */}
                <div className="bg-white p-5 rounded-lg lg:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Basic Information */}
                        <div className="flex flex-col gap-5">
                            <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                                <span className='text-blue-500'><FaRegBuilding /></span> Basic Information
                            </h3>
                            <Input
                                type='text'
                                inputLabel='College Name'
                                name='name'
                                value={collegeData.name}
                                onChange={handleChange}
                                placeHolder='Enter college name'
                            />
                            <Input
                                type='textarea'
                                textArea={true}
                                inputLabel='College Description'
                                name='description'
                                value={collegeData.description}
                                onChange={handleChange}
                                placeHolder='Enter college description'
                                rows={4}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">College Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg p-1.5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="flex flex-col gap-5">
                            <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                                <span className='text-blue-500'><MdOutlineFlag /></span> Mission &amp; Vision
                            </h3>
                            <Input
                                type='textarea'
                                textArea={true}
                                inputLabel='Mission Statement'
                                name='mission'
                                value={collegeData.mission}
                                onChange={handleChange}
                                placeHolder='Enter mission statement'
                                rows={3}
                            />
                            <Input
                                type='textarea'
                                textArea={true}
                                inputLabel='Vision Statement'
                                name='vision'
                                value={collegeData.vision}
                                onChange={handleChange}
                                placeHolder='Enter vision statement'
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Contact Information */}
                <div className="bg-white p-5 rounded-lg lg:p-7 flex flex-col gap-5">
                    <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                        <span className='text-blue-500'><FaEnvelope /></span> Contact Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-5">
                        <Input
                            type='text'
                            inputLabel='Timings'
                            name='timmings'
                            value={collegeData.timmings}
                            onChange={handleChange}
                            placeHolder='e.g. 9:00 AM – 5:00 PM'
                        />
                        <Input
                            type='email'
                            inputLabel='Email'
                            name='email'
                            value={collegeData.email}
                            onChange={handleChange}
                            placeHolder='college@example.com'
                        />
                        <Input
                            type='number'
                            inputLabel='Phone'
                            name='phone'
                            value={collegeData.phone}
                            onChange={handleChange}
                            placeHolder='Enter phone number'
                        />
                    </div>
                    <Input
                        type='text'
                        inputLabel='Address'
                        name='address'
                        value={collegeData.address}
                        onChange={handleChange}
                        placeHolder='Enter full college address'
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type='submit'
                        disabled={saving}
                        className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
                    >
                        {saving ? 'Saving...' : hasExisting ? 'Update College Data' : 'Save College Data'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageCollege;