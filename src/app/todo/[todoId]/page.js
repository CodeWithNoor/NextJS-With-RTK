"use client"
import React, { useState } from 'react'
import { useUpdateAPIMutation } from "../../redux/TodoSlice"
import { useRouter } from 'next/navigation'

const page = (props) => {
    console.log(props.params.todoId)
    const [task, setTask] = useState("")
    const [fetchAPI] = useUpdateAPIMutation()
    const router = useRouter()

    const handletask = async () => {
        await fetchAPI({ task, id: props.params.todoId })
        setTask("")
    }

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