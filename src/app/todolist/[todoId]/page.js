"use client"
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "../style.css"
import { useRouter } from 'next/navigation'

const page = (props) => {
    const task = useSelector((state) => state.todoData.todos)
    const [todo, setTodo] = useState("")
    const router = useRouter()

    useEffect(() => {
        const editData = task.find((item) => {
            return item.id === props.params.todoId
        })
        setTodo(editData.payload.todos)
    }, [task])

    const handleRouting = () => {
        router.push("/todolist")
    }


    return (
        <div className="container">
            <h1>EDIT TASK</h1>
            <input type="text" name="todo" id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Add task' />
            <button >EDIT TASK</button>
            <button onClick={handleRouting}>TODO LIST</button>
        </div>
    )
}

export default page