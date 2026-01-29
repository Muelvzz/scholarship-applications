export default function ScholarshipCard({ scholarships, setScholarship, setIsSelected }) {

    return (
        <>
            <div className="flex justify-between text-xl font-bold">
                <div>Scholarships</div>
                <div></div>
            </div>
            <div className='
                mt-5 flex flex-col
                sm:grid sm:grid-cols-2 lg:grid-cols-4
                gap-3'
            >
                {scholarships.map((sch, idx) => (
                    <button 
                        key={ idx }
                        className="
                            bg-white p-3 text-black rounded-lg
                            cursor-pointer text-left 
                            duration-300 hover:text-blue-700
                            transition-transform hover:-translate-y-1"
                        onClick={() => {
                            setScholarship(sch)
                            setIsSelected(true)
                        }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <img 
                                src="/card-icon.png" alt="Card Icon" 
                                className="w-8 bg-gray-500 p-1 rounded-lg"
                            />
                            <p 
                                className="
                                    font-semi text-xs
                                    bg-gray-300 py-1 px-3 rounded-lg"
                            >{ sch.deadline }</p>
                        </div>
                        <h1 className="text-xl font-semibold">
                            { sch.title.length > 40 ? 
                            sch.title.slice(0, 40) + '...' :
                            sch.title}
                        </h1>
                        <div className="flex mt-6">
                            <img 
                                src="/link.png" alt="Link Icon" 
                                className="w-5"
                            />
                            <a href={ sch.link }>{ 
                                sch.link.length > 30 ?
                                sch.link.slice(0, 30) + '...' :
                                sch.link    
                            }</a>
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}