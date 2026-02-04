export default function UserTab({ remove, setRemove }) {
    return (
        <div className="flex justify-between">
            <div className="text-3xl font-bold">Users</div>
            <div>
                <button className="
                    px-5 py-2 bg-[#e94f37]
                    rounded-lg font-bold cursor-pointer
                    hover:bg-red-500 duration-300 hover:underline"
                    onClick={() => setRemove((prev) => !prev)}
                >{ remove ? 'Update Users' : 'Delete Users' }</button>
            </div>
        </div>
    )
}