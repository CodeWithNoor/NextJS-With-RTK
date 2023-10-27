import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import Todo from "@/lib/model/user";

export async function POST(req, res) {
    try {
        const payload = await req.json()
        const { task } = payload

        await mongoose.connect(connectionStr)
        const newTodo = new Todo({ task })
        if (!task || task === "") {
            return NextResponse.json({ message: "Task is required", success: false }, { status: 400 })
        }

        await newTodo.save()
        return NextResponse.json({ message: newTodo, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr)
        const todos = await Todo.find({})
        return NextResponse.json({ message: todos, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}
