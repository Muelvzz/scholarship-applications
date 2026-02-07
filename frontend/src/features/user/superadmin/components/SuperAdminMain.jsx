import UserTab from "./UserTab"
import UserFilter from "./UserFilter"
import UserCard from "./UserCard"

export default function SuperAdminMain({ 
    remove, setRemove, filter, 
    setFilter, setRefresh, total, 
    userList 
}) {
    return (
        <>
            <UserTab 
                remove={ remove }
                setRemove={ setRemove }
            />
            <UserFilter
                filter={ filter }
                setFilter={ setFilter }
                setRefresh={ setRefresh }
                total={ total }
            />
            <UserCard 
                userList={ userList }
                remove={ remove }
                setRefresh={ setRefresh }
            />
        </>
    )
}