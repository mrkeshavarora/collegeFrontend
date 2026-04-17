import React from 'react'
// import BlueStrap from '../../smallComponents/blueStrap/BlueStrap'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'
import GalleryCard from '../../smallComponents/galleryCard/GalleryCard'
import { useEffect, useState } from 'react'
import axiosInstance from '../../services/axiosInstance'

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGallery();
    }, []);

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
    }
    return (
        <div>
            <SmallBlueStrap head="Gallery" line="A visual journey through our campus, events, and student life." />
             <div className="px-4 md:px-14 pb-20">
                <div className="rounded-3xl relative z-40 -mt-10 md:-mt-20 top-5 gap-6 md:gap-8 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-h-[50vh] justify-items-center">
                    {loading ? (
                        <div className="col-span-full text-center py-20 text-[#1C398E] font-bold">
                            <div className="animate-pulse">Loading Your Memories...</div>
                        </div>
                    ) : (
                        galleryData.map((item) => (
                            item.images && item.images.map((img, index) => (
                                <GalleryCard 
                                    key={`${item._id}-${index}`} 
                                    imgSrc={img} 
                                    title={item.title}
                                    location={item.location}
                                />
                            ))
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}

export default Gallery