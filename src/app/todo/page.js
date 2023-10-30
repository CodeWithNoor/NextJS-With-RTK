"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAPIAxios } from "../redux/TodoSlice"
import { useSelector } from 'react-redux'
import { useFetchAPIMutation } from "../redux/TodoSlice"
import Delete from "../todo/delete"
import Link from 'next/link'
import "../addtodo/style.css"

const page = () => {
    const dispatch = useDispatch()
    const [task, setTask] = useState("")
    const data = useSelector((state) => state.todoData.fetchAPIinRTK)
    const [fetchAPI] = useFetchAPIMutation()

    const taskDispatch = () => {
        dispatch(fetchAPIAxios())
    }

    const handletask = async () => {
        await fetchAPI({ task })
        setTask("")
    }

    return (
        <>
            <div className="container">
                <h1>TODO LIST</h1>
                <input type="text" name='task' id='task' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Enter Task' />
                <button onClick={handletask}>Submit</button>
                <button onClick={taskDispatch}>Load More</button>
                <div className='task-mapping' style={{ color: "white" }}>
                    {
                        data.map((item, id) => (
                            <div key={id} style={{ margin: "10px" }}>
                                <p>ID: {item._id}</p>
                                <p>TASK: {item.task}</p>
                                <p><Link href={`http://localhost:3000/todo/${item._id}`}>Edit</Link></p>
                                <p><Delete id={item._id} /> </p>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default page
