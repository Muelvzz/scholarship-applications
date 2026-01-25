export default function DeskBoard({ scholarship }) {
    return (
        <>
            <div className="lg:flex-1 bg-gray-400 rounded-[1vw] p-5 overflow-y-auto max-h-screen overscroll-contain">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">{ scholarship.title }</h1>
                    <h1>Deadline: { scholarship.deadline }</h1>
                </div>

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
        </>
    )
}