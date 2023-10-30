import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import UserAuth from "@/lib/model/userAuth";
import bcrypt from "bcrypt";

export async function PUT(req, content) {
    try {
        const payload = await content.params.userId
        const filter = { _id: payload }

        await mongoose.connect(connectionStr)
        const reqBody = await req.json()
        const { password } = reqBody
        const user = await UserAuth.findByIdAndUpdate(filter, password, { new: true })
        if (!user) {
            return NextResponse.json({ message: "user not found", success: false }, { status: 404 })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        return NextResponse.json({ message: "Password Updated Successfully", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function GET(req, content) {
    try {
        const payload = await content.params.userId
        const filter = { _id: payload }

        await mongoose.connect(connectionStr)
        const user = await UserAuth.findById(filter)
        if (!user) {
            return NextResponse.json({ message: "User Not Found, success: false" }, { status: true })
        }
        console.log(user)
        return NextResponse.json({ message: user, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function DELETE(req, content) {
    try {
        const payload = await content.params.userId
        const filter = { _id: payload }

        await mongoose.connect(connectionStr)
        const user = await UserAuth.findByIdAndDelete(filter)
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }
        return NextResponse.json({ message: "Delete User Data Successfully", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}