export default function UserFilter({ filter, setFilter, setRefresh, total }) {

    const isAll = Boolean(filter === 'all')
    const isAdmin = Boolean(filter === 'admin')
    const isUser = Boolean(filter === 'user')

    const buttonFilterStyle = 'sm:pd-4 md:px-8 cursor-pointer duration-300 active:bg-[#e94f37 ] focus:font-bold'

    return (
        <>
            <div className="
                flex justify-between mt-2
                items-center
            ">
                <div className="
                    flex font-medium text-lg
                    gap-x-5
                ">
                    <button 
                        className={`${buttonFilterStyle} ${isAll && ('bg-[#e94f37]')}`}
                        onClick={() => {
                            setFilter('all')
                            setRefresh((prev) => !prev)
                        }}
                    >All</button>
                    <button 
                        className={`${buttonFilterStyle} ${isAdmin && ('bg-[#e94f37]')}`}
                        onClick={() => {
                            setFilter('admin')
                            setRefresh((prev) => !prev)
                        }}
                    >Admin</button>
                    <button
                        className={`${buttonFilterStyle} ${isUser && ('bg-[#e94f37]')}`}
                        onClick={() => {
                            setFilter('user')
                            setRefresh((prev) => !prev)
                        }}
                    >User</button>
                </div>
                <div>Total: { total }</div>
            </div>
            <hr />
        </>
    )
}