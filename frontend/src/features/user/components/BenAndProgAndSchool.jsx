export default function BenAndProgAndSchool({ paragraphStyle, formStyle, benefitsSize, handleBenefitsSize, handleBenefits, programSize, handleProgramSize, handlePrograms, schoolSize, handleSchoolSize, handleSchool }) {

    return (
        <>
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
                <div>
                    <div className="flex justify-between mr-3 items-center">
                        <p className={`${ paragraphStyle }`}>Benefits:</p>
                        <input 
                            type="number" value={ benefitsSize } min={0}
                            onChange={ handleBenefitsSize }
                            placeholder="# of Benefits"
                            className={`${ formStyle } my-2`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {Array.from({ length: benefitsSize }, (_, index) => (
                            <input
                                key={ index } type="text"
                                placeholder={`Benefit #${ index + 1 }`}
                                className={ formStyle }
                                onChange={ handleBenefits }
                                required
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mr-3 items-center">
                        <p className={`${ paragraphStyle }`}>Priority Programs:</p>
                        <input 
                            type="number" value={ programSize } min={0}
                            onChange={ handleProgramSize }
                            placeholder="# of Priority"
                            className={`${ formStyle } my-2`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {Array.from({ length: programSize }, (_, index) => (
                            <input
                                key={ index } type="text"
                                placeholder={`Program #${ index + 1 }`}
                                className={ formStyle }
                                onChange={ handlePrograms }
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mr-3 items-center">
                        <p className={`${ paragraphStyle }`}>Priority Schools:</p>
                        <input 
                            type="number" value={ schoolSize } min={0}
                            onChange={ handleSchoolSize }
                            placeholder="# of Schools"
                            className={`${ formStyle } my-2`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-2">
                        {Array.from({ length: schoolSize }, (_, index) => (
                            <input
                                key={ index } type="text"
                                placeholder={`School #${ index + 1 }`}
                                className={ formStyle }
                                onChange={ handleSchool }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}