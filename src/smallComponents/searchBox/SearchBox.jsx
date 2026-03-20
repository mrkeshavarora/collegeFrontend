 import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBox = ({ placeholder = "Search", btnName = "Add New +", onClick, searchTerm, onSearchChange }) => {
    return (
        <div className='shadow-lg w-full flex bg-white items-center justify-between gap-2 min-h-16  rounded-xl p-4 flex-col md:flex-row'>
            <div className="flex items-center gap-2  bg-[#f5f4f4] rounded-lg p-2 w-full md:w-1/3  ">
                <FaSearch />
                <input type="text" placeholder={placeholder} value={searchTerm} onChange={onSearchChange} className='outline-none w-full bg-transparent' />
            </div>
            <button
                onClick={onClick}
                className='bg-[#1d4ed8] hover:bg-[#153eb8] transition-colors text-white rounded-lg px-5 py-2 text-xl font-semibold w-full md:w-auto active:scale-95'
            >
                {btnName}
            </button>
        </div>
    )
}

export default SearchBox
