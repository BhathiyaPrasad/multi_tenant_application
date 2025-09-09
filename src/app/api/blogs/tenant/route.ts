import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import prisma from '@/app/lib/prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const tenantSlug = req.headers.get('x-tenant')

    if (!token || !tenantSlug) {
        return NextResponse.json([], { status: 401 })
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        const userId = payload.userId
        const tenantId = payload.tenantId

        const tenant = await prisma.tenant.findUnique({
            where: { slug: tenantSlug },
        })

        if (!tenant || tenant.id !== tenantId) {
            return NextResponse.json({ error: 'Tenant mismatch' }, { status: 403 })
        }

        const blogs = await prisma.blogs.findMany({
            where: {
                tenantId: tenant.id,

            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(blogs)
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }
}


export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const tenantSlug = req.headers.get('x-tenant')

    if (!token || !tenantSlug) {

        return NextResponse.json( {
                error: "Unauthorized",
                reason: "No Token or Tenant Slug",
                token: token ?? null,
                tenantSlug: tenantSlug ?? null,
            },
            { status: 401 })
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        const userId = payload.userId
        const tenantId = payload.tenantId

        const tenant = await prisma.tenant.findUnique({
            where: { slug: tenantSlug },
        })

        if (!tenant || tenant.id !== tenantId) {
            return NextResponse.json({ error: 'Tenant mismatch' }, { status: 403 })
        }

        const { title, Description, content, type } = await req.json()

        if (!title || !content || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const newBlog = await prisma.blogs.create({
            data: {
                title,
                Description,
                content,
                type,
                tenantId: tenant.id,
            },
        })

        return NextResponse.json(newBlog, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }
}