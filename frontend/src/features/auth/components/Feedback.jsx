export default function Feedback({ status, message }) {
    if (status === 'idle') return null

    const base = 'px-4 py-2 rounded-[0.5vw] text-white mb-2'

    if (status === 'success') {
        return <div className={ `${base} bg-green-600` }>{ message }</div>
    }

    if (status === 'error') {
        return <div className={ `${base} bg-red-600` }>{ message }</div>
    }

    return null
}