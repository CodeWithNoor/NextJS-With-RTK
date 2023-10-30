import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import UserAuth from "@/lib/model/userAuth";
const bcrypt = require('bcrypt');

export async function POST(req, res) {
    try {
        const payload = await req.json()
        const { email, password } = payload

        await mongoose.connect(connectionStr)
        const user = await UserAuth.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid Credentials", success: false }, { status: 400 })
        }

        return NextResponse.json({ message: user, success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}

export async function GET(req, res) {
    try {
        return NextResponse.json({ message: "Get User Data Successfully", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 })
    }
}