"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { removeTodo } from "../redux/TodoSlice"
import Link from 'next/link'
import "./style.css"

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const task = useSelector((state) => state.todoData.todos)

    const handleRouting = () => {
        router.push("/addtodo")
    }

    return (
        <>
            <div className="container">
                <h1>TASK LIST</h1>

                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                task.map((item, id) => (
                                    <tr key={id}>
                                        <td>{item.payload.todo}</td>
                                        <td>
                                            <button onClick={() => dispatch(removeTodo(item.id))}>REMOVE</button>
                                            <Link href={`/todolist/${item.id}`}>EDIT</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button onClick={handleRouting}>ADD TASK</button>
                </div>
            </div>
        </>
    )
}

export default page