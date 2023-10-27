"use client"
import React from 'react'
import "./style.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeUser, updateUser } from '../redux/slice'


const UserList = () => {
  const users = useSelector((data) => data.userData.user)
  const dispatch = useDispatch()

  return (
    <>
      <div id="container">
        <h2>User Lists</h2>

        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, id) => (
                <tr key={id}>
                  <td>{item.id}</td>
                  <td>{item.payload.name}</td>
                  <td><button id='btn' onClick={() => dispatch(removeUser(item.id))} >Remove</button></td>
                  <td><button id='btn' onClick={() => dispatch(updateUser(item.id))}>Edit</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserList