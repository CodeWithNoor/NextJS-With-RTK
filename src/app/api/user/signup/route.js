import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import UserAuth from "@/lib/model/userAuth";
const bcrypt = require('bcrypt');

export async function POST(req, res) {
    try {
        const payload = await req.json()
        const { email, name, password, confirmPassword } = payload
        await mongoose.connect(connectionStr)


        const user = new UserAuth({ email, name, password, confirmPassword })
        if (!user || user === "") {
            return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        user.confirmPassword = await bcrypt.hash(confirmPassword, salt)

        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match", success: false }, { status: 400 })
        }

        await user.save()
        return NextResponse.json({ message: user, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr)
        const users = await UserAuth.find({})

        if (!users) {
            return NextResponse.json({ message: "user not found", success: false }, { status: 404 })
        }

        console.log("get user data successfully", users)
        return NextResponse.json({ message: users, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "something went wrong", success: false }, { status: 500 })
    }
}