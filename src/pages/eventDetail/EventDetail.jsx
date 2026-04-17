import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        fetchEventDetail();
    }, [id]);

    const fetchEventDetail = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/event/getSingle/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error("Error fetching event detail:", error);
            // Fallback: try to find in all events
            try {
                const allResponse = await axiosInstance.get('/event/all');
                const found = allResponse.data.find(e => e._id === id);
                if (found) setEvent(found);
            } catch (err) {
                console.log("Could not find event in fallback", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const nextImage = () => {
        if (!event?.images) return;
        setActiveImageIndex((prev) => (prev + 1) % event.images.length);
    };

    const prevImage = () => {
        if (!event?.images) return;
        setActiveImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-50 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-8 border-[#1C398E] rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <div className="text-9xl text-gray-200 font-black italic">404</div>
                <h2 className="text-3xl font-bold text-[#1C398E] -mt-10">Event Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-6 px-10 py-3 bg-[#1C398E] text-white rounded-full font-bold">Return to Events</button>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const formattedDate = !isNaN(eventDate.getTime()) 
        ? eventDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : event.date;

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
            <SmallBlueStrap head={event.title} line="Join us in celebrating academic excellence and campus vibrant life." />

            <div className="px-4 md:px-10 max-w-7xl mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-32 left-8 md:left-14 z-50 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm tracking-wide">BACK TO EVENTS</span>
                </button>

                {/* Event Main Card */}
                <div className="bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] relative z-40 -mt-24 overflow-hidden border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Gallery Section */}
                        <div className="lg:w-1/2 relative group bg-gray-900">
                            {event.images && event.images.length > 0 ? (
                                <>
                                    <img
                                        src={event.images[activeImageIndex]}
                                        alt={event.title}
                                        className="w-full h-[400px] lg:h-full object-cover transition-all duration-700"
                                    />
                                    {event.images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={prevImage}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <FaChevronLeft size={20} />
                                            </button>
                                            <button 
                                                onClick={nextImage}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <FaChevronRight size={20} />
                                            </button>
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                                {event.images.map((_, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className={`h-1.5 transition-all rounded-full ${idx === activeImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Event Content Section */}
                        <div className="lg:w-1/2 p-8 md:p-14 lg:p-16 space-y-10">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-1.5 bg-blue-50 text-[#1C398E] text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                                        Campus Event
                                    </span>
                                    <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                                        Open for All
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
                                    {event.title}
                                </h1>
                            </div>

                            {/* Event Logistics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-blue-50 text-[#1C398E] rounded-2xl">
                                        <FaCalendarAlt size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Date</p>
                                        <p className="font-bold text-gray-800">{formattedDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-blue-50 text-[#1C398E] rounded-2xl">
                                        <FaClock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Timmings</p>
                                        <p className="font-bold text-gray-800">{event.timmings || "Schedule TBD"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:col-span-2">
                                    <div className="p-4 bg-blue-50 text-[#1C398E] rounded-2xl">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Venue Location</p>
                                        <p className="font-bold text-gray-800">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
                                    <div className="h-6 w-1.5 bg-[#1C398E] rounded-full"></div>
                                    Event Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg font-light">
                                    {event.description || "Join us for an unforgettable experience at our upcoming campus event. This event is designed to bring together students, faculty, and the community to celebrate our shared values and achievements. Don't miss out on this opportunity to connect, learn, and grow."}
                                </p>
                            </div>

                            {/* Action Buttons */}
                                {/* <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-[#1C398E] text-white py-5 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        Register Now
                                    </button>
                                    <button className="flex-1 bg-white border-2 border-gray-100 text-gray-600 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-gray-50 transition-all">
                                        Add to Calendar
                                    </button>
                                </div> */}
                        </div>
                    </div>
                </div>

                {/* Additional Gallery Preview (if more than 1 image) */}
                {event.images && event.images.length > 1 && (
                    <div className="mt-16 space-y-8">
                        <h3 className="text-2xl font-black text-[#1C398E] uppercase tracking-widest text-center">Event Highlights</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {event.images.map((img, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer border-4 transition-all ${idx === activeImageIndex ? 'border-[#1C398E] scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${event.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;
