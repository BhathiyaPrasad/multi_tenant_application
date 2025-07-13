import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') ?? ''

    const blogs = await prisma.blogs.findMany({
        where: {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ],
        },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(blogs)
}
