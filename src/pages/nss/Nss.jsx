import React from 'react'
import SmallBlueStrap from '../../smallComponents/smallBlueStrap/SmallBlueStrap'

const Nss = () => {
    return (
        <div>
            <SmallBlueStrap head={`About ${"NSS"}`} line="Building a legacy of discipline, leadership, and service." />
            <div className="my-10 px-4 md:px-0">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-10 ">
                    <div className="flex flex-col gap-6">

                        <p className='text-center text-base md:text-lg'>
                            The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides opportunity to the student youth of schools, Technical Institutions, Graduate & Post Graduate colleges and Universities of India to take part in several Government led community service activities & programmes. The main aim of developing the personality and character of the student youth through voluntary community service. NSS was launched in 1969 in 37 Universities involving about 40,000 volunteers which has now spread over 657 Universities and 51 +2 Councils/Directorates, covering 20,669 Colleges/ Technical Institutions and 11,988 Senior Secondary School, benefitting over 7.4 crore students till now.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 italic">
                                <h2 className='text-xl md:text-2xl font-bold text-[#1C398E] mb-2'>Vision</h2>
                                <p className='text-base md:text-lg text-gray-700'>
                                    The vision of NSS is to shape the youth with the mind and spirit to serve the society and work for the social upliftment of the down-trodden masses of our nation as a movement.
                                </p>
                            </div>
                            <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 italic">
                                <h2 className='text-xl md:text-2xl font-bold text-[#1C398E] mb-2'>Mission</h2>
                                <p className='text-base md:text-lg text-gray-700'>
                                    The National Service Scheme functions with aim of making the youth inspired for the service of the people and hence NSS Aims Education through Community Service and Community Service through Education.
                                </p>
                            </div>
                            <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 italic">
                                <h2 className='text-xl md:text-2xl font-bold text-[#1C398E] mb-2'>Motto:</h2>
                                <p className='text-base md:text-lg text-gray-700 font-semibold'>NOT ME BUT YOU.</p>
                            </div>
                        </div>
                    </div>
                    {/* <img src="https://www.davcollegeasr.org/images/ncc.jpg" alt="" className='w-full h-[300px] md:h-[500px] object-cover rounded-2xl' /> */}
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                       <iframe className='w-full md:w-[49%] aspect-video rounded-xl' src="https://www.youtube.com/embed/P2jlKUMIJSE" title="National Unity Day celebrations at DAV College Amritsar" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                       <iframe className='w-full md:w-[49%] aspect-video rounded-xl' src="https://www.youtube.com/embed/aft7wzdO8Vg" title="Kalash Yatra by NSS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C398E] opacity-5 rounded-full -mr-16 -mt-16"></div>
                        
                        <div className="md:col-span-2 mb-2">
                            <h3 className='text-2xl md:text-3xl font-bold text-[#1C398E] flex items-center gap-2'>
                                <span className="w-8 h-1 bg-[#1C398E] rounded-full"></span>
                                NSS Team
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-orange-500">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>NSS In charge</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Savita</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#1C398E]">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Program Officer</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Seema Sharma</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#1C398E]">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Program Officer</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Navdeep Kaur Kalsi</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#1C398E]">
                            <h4 className='text-sm uppercase tracking-wider text-gray-500 font-bold'>Program Officer</h4>
                            <p className='text-lg font-medium text-gray-800'>Prof. Sakshi Sharma</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nss