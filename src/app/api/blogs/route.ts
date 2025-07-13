import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import prisma from '@/app/lib/prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const tenantSlug = req.headers.get('x-tenant')

    if (!token || !tenantSlug) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
1
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
