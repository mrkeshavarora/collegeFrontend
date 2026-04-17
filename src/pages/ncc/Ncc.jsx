import React from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'

const Ncc = () => {
    return (
        <div>
            <SmallBlueStrap head={`About ${"NCC"}`} line="Building a legacy of discipline, leadership, and service." />
            <div className="my-10 px-4 md:px-0">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

                    <p className='text-center text-base md:text-lg'>
                        At present, the college maintains two companies of NCC Infantry, three units of Naval Wing and one section NCC Air. The students can join NCC in any of the three wings. The NCC cadets are issued uniforms and other accessories which they are expected to use with care during the training period. If any issued article is lost or damaged, the student is supposed to bear the expenses. All cadets are expected to attend a camp for which they are detailed. A heavy penality is imposed for absence from the camp without permission. Exemption from parade/ special duty will be granted by the Principal on the recommendation of the Officer-In-Charge. if such a leave is not secured before it is availed of, the cadet need not submit application later on as it will be automatically rejected.
                    </p>
                    <img src="https://www.davcollegeasr.org/images/ncc.jpg" alt="" className='w-full h-[300px] md:h-[500px] object-cover rounded-2xl' />
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                        <iframe className='w-full md:w-[49%] aspect-video rounded-xl' src="https://www.youtube.com/embed/mgifGKN6EyY" title="Independence Day celebrations at DAV College Amritsar" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <iframe className='w-full md:w-[49%] aspect-video rounded-xl' src="https://www.youtube.com/embed/dGfCvDj8LXI" title="Republic Day Celebrations at DAV College Amritsar" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C398E] opacity-5 rounded-full -mr-16 -mt-16"></div>
                        
                        <div className="md:col-span-3 mb-2">
                            <h3 className='text-2xl md:text-3xl font-bold text-[#1C398E] flex items-center gap-2'>
                                <span className="w-8 h-1 bg-[#1C398E] rounded-full"></span>
                                NCC Incharge
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#1C398E]">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Army Wing</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Kamal Kishor</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-sky-500">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Air Force Wing</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Sanjiv Dutta</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-blue-600">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Navy Wing</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Gaurav Sharma</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Ncc