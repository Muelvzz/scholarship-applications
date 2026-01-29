export default function ScholarshipInfo({ scholarship, setIsSelected }) {
    return (
        <>
            <hr />
            <div key={scholarship.id} className="mt-5">

                <div className="flex gap-x-3 items-center">
                    <button 
                        onClick={() => setIsSelected(false)}
                        className="transition-transform duration-300 hover:scale-110"
                    >
                        <img 
                            src="/card-icon.png" alt="Card Icon"
                            className="w-10 bg-gray-500 p-1 rounded-lg" 
                        />
                    </button>

                    <div className="text-xl">
                        <strong>Scholarship</strong>/ {scholarship.title}
                    </div>
                </div>

                <div
                    className="text-center py-10"
                >
                    <h1 className="font-bold text-5xl mb-2 ">{ scholarship.title }</h1>
                    <p><strong>Deadline:</strong> { scholarship.deadline }</p>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-10">
                    <div>
                        <div className="text-justify indent-10 mb-10 font-bold">{ scholarship.description }</div>

                        <hr />

                        <div className="mt-10 mb-10">
                            <div className="font-bold text-2xl">Document Requirements:</div>
                            <ul className="ml-5 mt-2">
                                {scholarship.documentary_requirements.map((doc, idx) => (
                                    <li key={idx}>- { doc }</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 mb-10">
                            <div className="font-bold text-2xl">Students Eligibility:</div>
                            <ul className="ml-5 mt-2">
                                {scholarship.eligibility_requirements.map((doc, idx) => (
                                    <li key={idx}>- { doc }</li>
                                ))}
                            </ul>
                        </div>  
                    </div>

                    <div>
                        <div className="mt-10 mb-10">
                            <div className="font-bold text-2xl">Benefits:</div>
                            <ul className="ml-5 mt-2">
                                {scholarship.benefits.map((benefit, idx) => (
                                    <li key={idx}>- { benefit }</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 mb-10">
                            <div className="font-bold text-2xl">Priority Programs:</div>
                            <ul className="ml-5 mt-2">
                                {scholarship.priority_programs.map((prioProg, idx) => (
                                    <li key={idx}>- { prioProg }</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10">
                            <div className="font-bold text-2xl">Priority Schools:</div>
                            <ul className="ml-5 mt-2">
                                {scholarship.priority_schools.map((prioSchool, idx) => (
                                    <li key={idx}>- { prioSchool }</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center m-10">
                    <a href={ scholarship.link }>
                        <button 
                            className="
                                bg-[#e94f37] px-10 py-3
                                font-bold rounded-lg cursor-pointer
                                duration-300 transition-transform hover:-translate-y-1"
                        >Learn More</button>
                    </a>
                </div>

            </div>
        </>
    )
}