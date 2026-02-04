import api from "../../../../services/api"

export default function UserDelete({ user, setRefresh }) {

    function deleteUser(id) {
        try {
            api.delete(`/admin/${id}`, id)
            setRefresh(prev => !prev)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

    const handleDelete = (user) => {
        const confirmDelete = confirm(`Delete ${ user.first_name } credentials?`)

        if (confirmDelete) {
            deleteUser(user.id)
        }
    }

    return (
        <button
            onClick={() => handleDelete(user)}
        >
            <img 
                src='/delete.png'
                alt="Delete Icon"
                className="
                    w-11 rounded-lg p-1 duration-300 
                    hover:bg-white focus:bg-white active:bg-white" 
            />
        </button>
    )
}