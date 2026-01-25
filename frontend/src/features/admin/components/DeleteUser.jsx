import api from "../../../services/api"

export default function DeleteUser({ isDelete, setIsDelete, user, refresh, setRefresh }) {

    const handleDelete = async (id) => {

        try {
            await api.delete(`/admin/${ id }`, id)
            setIsDelete(false)
            setRefresh(() => !refresh)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

    return (
        <>
            <div
                key={ user.id }
                className={`
                    fixed inset-0 z-40
                    bg-black/40 backdrop-blur-sm transition-opacity duration-200
                    ${ isDelete ? 'opacity-100' : 'opacity-0 pointer-events-none' }
                `}>
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <div
                        className={`
                            shadow-2xl p-6 bg-red-500 rounded-[1vw] w-4/5 lg:w-2/5
                            transform transition-all duration-200 ease-out
                            ${ isDelete ? 'opacity-100' : 'opacity-95' }
                            `}
                    >
                        <div className="flex flex-col">
                            <div 
                                className="font-bold text-2xl flex justify-center"
                            >
                                <p>Delete <i>"{ user.first_name } { user.last_name }"</i> credentials?</p>
                            </div>
                            <div className="flex justify-around mt-7">
                                <button
                                    className="
                                        bg-green-400 py-2 px-8 rounded-[1vw] cursor-pointer
                                        transition-transform duration-400 hover:scale-103
                                        font-bold
                                    "
                                    onClick={() => setIsDelete(false)}
                                >Cancel</button>
                                <button
                                    className="
                                        bg-red-600 py-2 px-8 rounded-[1vw] cursor-pointer
                                        transition-transform duration-400 hover:scale-103 
                                        font-bold                               
                                    "
                                    onClick={() => handleDelete(user.id)}
                                >Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}