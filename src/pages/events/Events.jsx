import React, { useState, useEffect } from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import EventsCard from '../../smallComponents/eventsCard/EventsCard'
import axiosInstance from '../../services/axiosInstance';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/event/all');
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events data:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <SmallBlueStrap head="Events" line="Stay updated with the latest happenings and activities on campus." />
            <div className="px-4 md:px-10 pb-10">
                <div className="rounded-3xl relative z-40 -mt-20 top-5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
                    {loading ? (
                        <div className="col-span-full text-center py-20 text-[#1C398E] font-bold">
                            <div className="animate-pulse">Fetching campus events...</div>
                        </div>
                    ) : events.length > 0 ? (
                        events.map((event) => (
                            <EventsCard key={event._id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-32 text-gray-400">
                            No events are currently scheduled. Check back soon!
                        </div>
                    )}
                   
                </div>
            </div>

        </div>
    )
}

export default Events