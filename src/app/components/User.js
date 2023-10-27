"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slice'
import "./style.css"

const User = () => {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const userDispatch = () => {
        dispatch(addUser({ name }))
        setName("")
    }

    return (
        <>
            <div className="container">
                <h2>Add User</h2>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter User Name' />
                <button onClick={userDispatch}>SUBMIT</button>
            </div>
        </>
    )
}

export default User