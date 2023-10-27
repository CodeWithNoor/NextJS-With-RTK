"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchAPI } from "../redux/TodoSlice"
import { useSelector } from 'react-redux'

const page = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.todoData.fetchAPIinRTK)
    // console.log(data.todoData.fetchAPIinRTK)

    const taskDispatch = () => {
        dispatch(fetchAPI())
    }

    return (
        <>
            <div className="container">
                <h1>TODO LIST</h1>
                <button onClick={taskDispatch}>Load More</button>
                <div className='task-mapping'>
                    {
                        data.map((item, id) => (
                            <div key={id}>
                                <span>{item._id} : </span>
                                <span>{item.task}</span>
                                <span> : {item.createdAt}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default page
