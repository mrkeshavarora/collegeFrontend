import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import './GalleryCard.css'

const GalleryCard = ({ imgSrc, title, location }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='gallery-card-container group' onClick={toggleOpen}>
                <div className='gallery-card relative overflow-hidden h-full w-full rounded-2xl'>
                    <img 
                        src={imgSrc || "https://picsum.photos/seed/gallery/800/800"} 
                        alt={title || "College Gallery"} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#1C398E]/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             <p className="text-white font-black text-lg uppercase tracking-tight truncate">{title || "Campus Life"}</p>
                             <p className="text-blue-200 text-xs font-medium italic truncate">{location || "University Campus"}</p>
                        </div>
                        <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6M9 21l-6-6M21 3v6h-6M3 21v-6h6M21 3h-6M3 21h6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="lightbox-overlay" onClick={toggleOpen}>
                    <button className="close-btn" onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}>
                        <IoClose size={32} />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={imgSrc} alt={title} className="shadow-2xl border-4 border-white/10" />
                        {(title || location) && (
                            <div className="absolute -bottom-16 left-0 right-0 text-center space-y-1">
                                <h3 className="text-white text-2xl font-black uppercase tracking-widest">{title}</h3>
                                <p className="text-blue-300 italic">{location}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default GalleryCard