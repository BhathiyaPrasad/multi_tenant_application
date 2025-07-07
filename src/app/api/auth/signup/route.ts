import {NextResponse, NextRequest} from "next/server";
import prisma from '@/app/lib/prisma';
import {getTenantSlugFromHeader} from "@/app/lib/tenant";
import bcrypt from "bcrypt";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password} = body;
    // adding server side validation
    if (!email || !password || password.length < 6) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    console.log(body)
    // call the function in lb/tenant
    const tenantSlug = await getTenantSlugFromHeader();

    //search for tenant by slug
    const tenant = await prisma.tenant.findUnique({where: {slug: tenantSlug}})
        if (!tenant) return NextResponse.json({error: 'Tenant not found'}, {status: 404})

    // in case two users having same mail and different tenants
    const existing = await prisma.user.findFirst({
        where: {email, tenantId: tenant.id}
    })
        if (existing) return NextResponse.json({error: 'User exists'}, {status: 409})

    //  hash the password of the user
    const hashPassword = await bcrypt.hash(password, 10)

    // then save the user in to db
    console.log(hashPassword)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            tenantId: tenant.id
        }
    })
    return NextResponse.json({message: 'User created'})
}
