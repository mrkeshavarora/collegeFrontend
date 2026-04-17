import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const ManageTable = ({ 
    data = [], 
    onEdit, 
    onDelete,
    columns = []
}) => {
    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
            {/* overflow-x-auto enables horizontal scroll when columns exceed screen width */}
            <div className="overflow-x-auto w-full">
            <table className='min-w-max w-full border-collapse text-left'>
                <thead className='bg-[#f5f4f4]'>
                    <tr className="text-gray-700 font-semibold uppercase text-sm">
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4 capitalize whitespace-nowrap">{col}</th>
                        ))}
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.length > 0 ? (
                        data.map((info) => (
                            <tr key={info._id || info.id} className="hover:bg-gray-50 transition-colors  h-30">
                                {columns.map((col, idx) => (
                                    <td key={idx} className={`px-2  ${idx === 0 ? 'text-gray-800 font-medium' : 'text-gray-600'} pl-6`}>
                                        {col === 'photo' ? (
                                            info.photo ? (
                                                <img
                                                    src={info.photo}
                                                    alt={info.name || 'Faculty'}
                                                    className="max-w-40 h-24 aspect-square rounded-md object-cover border border-gray-300 shadow-sm"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : <span className="text-gray-300 text-xs">No photo</span>
                                        ) : col === 'images' ? (
                                            info.images && info.images.length > 0 ? (
                                                <div className="flex items-center gap-2 py-1">
                                                    {info.images.slice(0, 3).map((imgSrc, imgIdx) => (
                                                        <img
                                                            key={imgIdx}
                                                            src={imgSrc}
                                                            alt={info.title || 'Gallery Image'}
                                                            className="w-16 h-16 rounded-md object-cover border border-gray-300 shadow-sm shrink-0"
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    ))}
                                                    {info.images.length > 3 && (
                                                        <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                            +{info.images.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            ) : <span className="text-gray-300 text-xs">No images</span>
                                        ) : (
                                            info[col] || (col === 'expirence' ? info['experience'] : '') || (col === 'experience' ? info['expirence'] : '') || (col === 'name' ? info['courseName'] : '')
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-4">
                                        <button
                                            onClick={() => onEdit(info)}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            aria-label="Edit"
                                        >
                                            <FaEdit className="text-lg" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(info._id || info.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            aria-label="Delete"
                                        >
                                            <FaTrash className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-6 py-10 text-center text-gray-400">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default ManageTable
