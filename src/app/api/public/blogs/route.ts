import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET() {
    try {
        const blogs = await prisma.blogs.findMany({
            orderBy: { createdAt: "desc" },
        })
        console.log(blogs)
        return NextResponse.json(blogs)
    } catch (err) {
        console.error("Error fetching blogs:", err)
        return NextResponse.json(
            { error: "Something went wrong" , err },
            { status: 500 }
        )
    }
}
