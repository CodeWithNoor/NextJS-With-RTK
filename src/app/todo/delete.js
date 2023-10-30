import React from 'react'
import { useDeleteAPIMutation } from "../redux/TodoSlice"

const Delete = (props) => {
    const { id } = props
    console.log("id", id)
    const [fetchAPI] = useDeleteAPIMutation()

    const handleDelete = async () => {
        await fetchAPI(id)
        alert("Deleted Successfully")
    }

    return (
        <>
            <button id='btn' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default Delete