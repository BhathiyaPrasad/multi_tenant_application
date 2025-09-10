import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import prisma from '@/app/lib/prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const  id  = params.id;
    const token = req.cookies.get('token')?.value
    const tenantSlug = req.headers.get('x-tenant')

    if (!token || !tenantSlug) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

        const blog = await prisma.blogs.findUnique({
            where: { id: id },
        })

        if (!blog || blog.tenantId !== tenant.id) {
            return NextResponse.json({ error: 'Blog not found or access denied' }, { status: 404 })
        }

        await prisma.blogs.delete({
            where: { id: id },
        })

        return NextResponse.json({ message: 'Blog deleted' })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const token = req.cookies.get('token')?.value
    const tenantSlug = req.headers.get('x-tenant')

    if (!token || !tenantSlug) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

        const blog = await prisma.blogs.findUnique({
            where: { id: id},
        })

        if (!blog || blog.tenantId !== tenant.id) {
            return NextResponse.json({ error: 'Blog not found or access denied' }, { status: 404 })
        }

        const { title, Description, content, type } = await req.json()
        if (!title || !content || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const updatedBlog = await prisma.blogs.update({
            where: { id: id },
            data: {
                title,
                Description,
                content,
                type,
            },
        })

        return NextResponse.json(updatedBlog)
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }
}