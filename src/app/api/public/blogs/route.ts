import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function GET() {
    try {
        const blogs = await prisma.blogs.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                content: true,
                type: true,
                Description: true,
                createdAt: true,

            },
        })

        return NextResponse.json(blogs)
    } catch (err) {
        console.error("Error fetching blogs:", err)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
