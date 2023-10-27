"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const page = () => {
    const products = useSelector((data) => data.productData.products)

    return (
        <>
            <div id="container">
                <table border={2}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Brand</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, id) => (
                            <tr key={id}>
                                <td>{item.payload.name}</td>
                                <td>{item.payload.price}</td>
                                <td>{item.payload.description}</td>
                                <td>{item.payload.brand}</td>
                                <td>{item.payload.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link href={"/"} id='add-product'>Add Product</Link>
            </div>
        </>
    )
}

export default page