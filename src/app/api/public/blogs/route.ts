import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET() {
    try {
        const blogs = await prisma.blogs.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                tenant: true,
                Comment: true,
            },
        })

        return NextResponse.json(blogs)
    } catch (err) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
