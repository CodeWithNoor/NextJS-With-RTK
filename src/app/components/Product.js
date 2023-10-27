"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/ProductSlice'
import Link from 'next/link'
import "./style.css"

const Product = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const dispatch = useDispatch()

    const userDispatch = (e) => {
        e.preventDefault()
        dispatch(addProduct({ name, price, description, category, brand }))
    }

    return (
        <>
            <div className="container" id='form'>
                <form action="" onSubmit={userDispatch}>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Product Name' />
                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Product Price' />
                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Product Category' />
                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Product Description' />
                    <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Product Brand' />
                    <input type="submit" value="SUBMIT" />
                    <Link href={"/productslist"}>Go To Product List</Link>
                </form>
            </div>
        </>
    )
}

export default Product