import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import Todo from "@/lib/model/user";

export async function PUT(req, content) {
    try {
        const payload = content.params.todoId
        const filter = { _id: payload }

        // console.log(filter)
        await mongoose.connect(connectionStr)

        const reqBody = await req.json()
        const user = await Todo.findByIdAndUpdate(filter, reqBody, { new: true })

        if (!user) {
            return NextResponse.json({ message: "user not found", success: false }, { status: 404 })
        }

        await user.save()
        return NextResponse.json({ message: user, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function GET(req, content) {
    try {
        const payload = await content.params.todoId
        const filter = { _id: payload }

        await mongoose.connect(connectionStr)
        const user = await Todo.findById(filter)
        if (!user) {
            return NextResponse.json({ message: "user not found", success: false }, { status: 404 })
        }
        console.log(user)
        return NextResponse.json({ message: user, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function DELETE(req, content) {
    try {
        const payload = await content.params.todoId
        const filter = { _id: payload }

        await mongoose.connect(connectionStr)
        const user = await Todo.findByIdAndDelete(filter)
        if (!user) {
            return NextResponse.json({ message: "user not found", success: false }, { status: 404 })
        }
        console.log(user)
        return NextResponse.json({ message: "Task Deleted Successfully", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}