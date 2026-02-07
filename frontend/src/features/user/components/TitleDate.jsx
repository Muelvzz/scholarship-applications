export default function TitleDate({ formStyle, title, handleTitle, deadline, handleDeadline }) {
    return (
        <>
            <div className="flex flex-row gap-x-4">
                <input 
                    type="text" className={`${ formStyle } w-full`}
                    placeholder="Scholarship Name (e.g 2026 DOST-SEI Undergraduate Science and Technology Scholarship)"
                    value={ title } onChange={ handleTitle }
                    required
                />
                <input 
                    type="date" className={`${ formStyle }`}
                    title="Deadline"
                    value={ deadline } onChange={ handleDeadline }
                    required
                />
            </div>
        </>
    )
}