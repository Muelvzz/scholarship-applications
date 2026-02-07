export default function ReqsAndElig({ paragraphStyle, formStyle, documentSize, handleDocumentSize, handleDocuments, eligibilitySize, handleEligibilitySize, handleEligibility }) {
    return (
        <>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
                <div>
                    <div className="flex justify-between mr-3 items-center">
                        <p className={`${ paragraphStyle }`}>Document Requirements:</p>
                        <input 
                            type="number" value={ documentSize } min={0}
                            onChange={ handleDocumentSize }
                            placeholder="# of Documents"
                            className={`${ formStyle } my-2`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {Array.from({ length: documentSize }, (_, index) => (
                            <input
                                key={ index } type="text"
                                placeholder={`Document #${ index + 1 }`}
                                className={ formStyle }
                                onChange={(e) => handleDocuments(index, e.target.value)}
                                required
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mr-3 items-center">
                        <p className={`${ paragraphStyle }`}>Students Eligibility:</p>
                        <input 
                            type="number" value={ eligibilitySize } min={0}
                            onChange={ handleEligibilitySize }
                            placeholder="# of Eligibility"
                            className={`${ formStyle } my-2`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {Array.from({ length: eligibilitySize }, (_, index) => (
                            <input
                                key={ index } type="text"
                                placeholder={`Elgibility #${ index + 1 }`}
                                className={ formStyle }
                                onChange={ handleEligibility }
                                required
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}