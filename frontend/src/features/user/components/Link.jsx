export default function Link({ formStyle, link, handleLink }) {
    return (
        <>
            <div>
                <input 
                    type="text" className={`${ formStyle } w-full`}
                    placeholder="Scholarship Link"
                    value={ link } onChange={ handleLink }
                />
            </div>
        </>
    )
}