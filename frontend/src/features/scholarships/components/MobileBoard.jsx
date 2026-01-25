export default function MobileBoard({ scholarship, isSelected, setIsSelected }) {
    return (
        <>
            <div 
                className={`
                    fixed inset-0 z-40
                    bg-black/40 backdrop-blur-sm
                    transition-opacity duration-200
                    ${isSelected ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}
                onClick={() => setIsSelected(false)}
            >
                <div
                    className={`
                        absolute z-50 inset-x-0 bottom-0
                        `}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`
                            h-[80vh]
                            bg-gray-400 shadow-2xl p-6
                            transform transition-all duration-200 ease-out
                            ${isSelected ? 'opacity-100' : 'opacity-0 scale-95'}
                            overflow-y-auto overscroll-contain
                            `}
                    >
                        <div>
                            
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{ scholarship.title }</h1>
                                <h1>Deadline: { scholarship.deadline }</h1>
                            </div>
                            <hr />

                            <div className="mt-3 mb-5 text-justify">
                                <p>
                                    <strong>Description: </strong>{ scholarship.description } 
                                </p>
                            </div>

                            <div className="mb-3">
                                <h1 className="text-xl font-semibold">Eligibility Requirements:</h1>
                                <ul className="list-disc ml-10">
                                    {scholarship.eligibility_requirements.map((eli, idx) => (
                                        <li key={ idx }>{ eli }</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h1 className="text-xl font-semibold">Documentary Requirements:</h1>
                                <ul className="list-disc ml-10">
                                    {scholarship.documentary_requirements.map((doc, idx) => (
                                        <li key={ idx }>{ doc }</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h1 className="text-xl font-semibold">Benefits:</h1>
                                <ul className="list-disc ml-10">
                                    {scholarship.benefits.map((benefit, idx) => (
                                        <li key={ idx }>{ benefit }</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h1 className="text-xl font-semibold">Priority Programs:</h1>
                                <ul className="list-disc ml-10">
                                    {scholarship.priority_programs.map((prioPro, idx) => (
                                        <li key={ idx }>{ prioPro }</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h1 className="text-xl font-semibold">Priority Schools:</h1>
                                <ul className="list-disc ml-10">
                                    {scholarship.priority_schools.map((prioSch, idx) => (
                                        <li key={ idx }>{ prioSch }</li>
                                    ))}
                                </ul>
                            </div>

                            <hr />
                            <strong>Further Read: </strong>
                            <a 
                                className="hover:underline"
                                href={`${scholarship.link}`}
                            >{ scholarship.link }</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}