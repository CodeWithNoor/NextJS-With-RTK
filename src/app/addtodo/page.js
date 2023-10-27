"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from "../redux/TodoSlice"
import { useRouter } from 'next/navigation'


import "./style.css"

const page = () => {
    const [todo, setTodo] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()

    const handleRouting = () => {
        router.push("/todolist")
    }

    const userDispatch = () => {
        dispatch(addTodo({ todo }))
        setTodo("")
    }
    return (
        <>
            <div className="container">
                <h1>ADD TASK</h1>
                <input type="text" name="todo" id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Add task' />
                <button onClick={userDispatch}>ADD TASK</button>
                <button onClick={handleRouting}>TODO LIST</button>
            </div>
        </>
    )
}

export default page