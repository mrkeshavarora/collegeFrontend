import React from 'react'
import './SmallBlueStrap.css'
const SmallBlueStrap = ({ head = "About College", line = "Building a legacy of excellence and innovation in education" }) => {
    return (
        <div className='small-blue-strap py-16 md:py-24 px-6 min-h-[15rem] flex justify-center items-center bg-gradient-to-br from-[#1C398E] via-[#1C398E] to-[#254cc2] relative overflow-hidden'>
            {/* Subtle decorative element */}
            <div className="absolute border-2 top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>

            <div className="max-w-4xl w-full gap-4 flex flex-col justify-center items-center text-center relative z-10">
                <h2 className='text-white font-bold text-4xl md:text-6xl tracking-tight'>{head}</h2>
                <p className='text-white font-light text-base md:text-lg opacity-90 max-w-2xl'>{line}</p>
            </div>
        </div>
    )
}

export default SmallBlueStrap