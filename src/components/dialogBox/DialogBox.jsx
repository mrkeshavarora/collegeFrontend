import React from 'react'
import { FaTimes } from 'react-icons/fa'

const DialogBox = ({ 
    isOpen, 
    onClose, 
    formData, 
    onChange, 
    onSubmit, 
    isEditing, 
    fields = [], 
    title = "Record" 
}) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-56 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 ">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-screen">
                {/* Sticky Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <h2 className="text-2xl font-bold text-gray-800">{isEditing ? `Edit ${title}` : `Add New ${title}`}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="overflow-y-auto flex-1 px-6 py-5">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    {fields.map((field, idx) => {
                        const fieldName = field.name || `field${idx + 1}`;
                        const isFile = field.type === 'file';
                        return (
                            <div key={idx}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={fieldName}
                                        value={formData[fieldName] || ''}
                                        onChange={onChange}
                                        required={field.required !== false}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        rows="3"
                                    />
                                ) : field.type === 'select' ? (
                                    <select
                                        name={fieldName}
                                        value={formData[fieldName] || ''}
                                        onChange={onChange}
                                        required={field.required !== false}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                                    >
                                        <option value="">-- Select --</option>
                                        {(field.options || []).map((opt, oIdx) => (
                                            <option key={oIdx} value={opt.value ?? opt}>{opt.label ?? opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === 'radio' ? (
                                    <div className="flex flex-wrap gap-4 mt-1">
                                        {(field.options || []).map((opt, oIdx) => {
                                            const val = opt.value ?? opt;
                                            const lbl = opt.label ?? opt;
                                            const isSelected = formData[fieldName] === val;
                                            return (
                                                <label key={oIdx} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                                    <input
                                                        type="radio"
                                                        name={fieldName}
                                                        value={val}
                                                        checked={isSelected}
                                                        onChange={onChange}
                                                        required={field.required !== false}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span className="font-medium">{lbl}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : isFile ? (
                                    <div className="flex flex-col gap-2">
                                        {/* Show existing photo when editing */}
                                        {isEditing && formData[fieldName] && (
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={formData[fieldName]}
                                                    alt="Current photo"
                                                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                                <span className="text-xs text-gray-500">Current photo — pick a new one to replace</span>
                                            </div>
                                        )}
                                        {/* File picker — no value prop, file inputs can't be controlled */}
                                        <input
                                            type="file"
                                            name={fieldName}
                                            accept="image/*"
                                            multiple={field.multiple || false}
                                            onChange={onChange}
                                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg p-1.5 transition-all"
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type={field.type || "text"}
                                        name={fieldName}
                                        value={formData[fieldName] || ''}
                                        onChange={onChange}
                                        min={field.min}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Sticky Footer — always visible */}
                    <div className="mt-2 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            {isEditing ? "Save Changes" : `Add ${title}`}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default DialogBox