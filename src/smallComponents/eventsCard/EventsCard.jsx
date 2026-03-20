import React from 'react'
import './EventCard.css'
import { FaLocationDot } from "react-icons/fa6";

import { MdOutlineDateRange } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const EventsCard = ({ event = {} }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (event._id) {
            navigate(`/events/${event._id}`);
        }
    };

    const eventDate = new Date(event.date);
    const formattedDate = !isNaN(eventDate.getTime()) 
        ? eventDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : event.date;

    return (
        <>
            <div className="event-card group cursor-pointer" onClick={handleCardClick}>
                <div className="event-image relative overflow-hidden">
                    <img 
                        src={(event.images && event.images[0]) || "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                        alt={event.title} 
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-[#1C398E] px-6 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                            View Event Details
                        </span>
                    </div>
                </div>
                <div className="event-info">
                    <p className='event-date'><MdOutlineDateRange className="text-[#1C398E]" />{formattedDate || "TBD"}</p>
                    <h2 className='event-name font-bold text-2xl group-hover:text-[#1C398E] transition-colors'>
                        {event.title || "Untitled Event"}
                    </h2>
                    <p className='event-description line-clamp-2'>{event.description || "Join us for this special campus event."}</p>
                    <p className='event-location flex items-center'><FaLocationDot className="text-[#1C398E]" />
                        {event.location || "Campus"}</p>
                </div>
            </div>
        </>
    )
}

export default EventsCard