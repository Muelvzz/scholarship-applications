export default function Description({ formStyle, description, handleDescription }) {
    return (
        <>
            <div>
                <textarea 
                    rows={10} placeholder="Scholarship Description..."
                    className={`${ formStyle } w-full`}
                    value={ description } onChange={ handleDescription }
                    required
                ></textarea>
            </div>
        </>
    )
}