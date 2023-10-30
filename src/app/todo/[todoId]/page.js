"use client"
import React, { useState } from 'react'
import { useUpdateAPIMutation } from "../../redux/TodoSlice"
import { useRouter } from 'next/navigation'

const page = (props) => {
    const [task, setTask] = useState("")
    const [fetchAPI] = useUpdateAPIMutation()
    const router = useRouter()

    const handletask = () => {
        fetchAPI({ task }, props.id)
        setTask("")
        alert("Updated Successfully")
    };


    const handleRouting = () => {
        router.push("/todo")
    }

    return (
        <>
            <div className="container">
                <h1>UPDATE TASK</h1>
                <input type="text" name='task' id='task' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Update Task' />
                <button onClick={handletask}>Submit</button>
                <button onClick={handleRouting}>Go to todo list</button>
            </div>
        </>
    )
}

export default page