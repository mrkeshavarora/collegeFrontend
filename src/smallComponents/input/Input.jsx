import React from 'react'
import { IoMailOutline } from "react-icons/io5";

const Input = ({ placeHolder = "Enter Here",textArea=false, inputLabel = "", inputIcon = null, type = "text", ...props }) => {
    return (<div className="">
        <label htmlFor="" className='font-bold text-[#364153]'>{inputLabel}</label>

        <div className='bg-[#f1f1f1] border border-gray-100 p-2 rounded-lg  gap-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'>
            <div className=" flex gap-2">
                                            
                {inputIcon && (
                    <div className='text-gray-400 flex items-center justify-center shrink-0'>
                        {inputIcon}
                    </div>
                )}
                {
                    textArea ? (
                        <textarea
                            className='bg-transparent  outline-none w-full  text-gray-700 placeholder:text-gray-400'
                            placeholder={placeHolder}
                            {...props}
                        />
                    ) : (
                        <input
                            type={type}
                            className='bg-transparent  outline-none w-full  text-gray-700 placeholder:text-gray-400'
                            placeholder={placeHolder}
                            {...props}
                        />
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default Input