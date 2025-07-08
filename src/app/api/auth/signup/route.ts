import {NextResponse, NextRequest} from "next/server";
import prisma from '@/app/lib/prisma';
import bcrypt from "bcrypt";


function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password, username} = body;
    // adding server side validation
    if (!email || !password || password.length < 6 || !username || username.length < 3) {
        return NextResponse.json({error: 'Invalid input'}, {status: 400})
    }

    console.log(body)

    const tenantSlug = slugify(username);

    let tenant = await prisma.tenant.findUnique({where: {slug: tenantSlug}})
    if (!tenant) {
         tenant = await prisma.tenant.create({
            data: {
                slug: tenantSlug,
                name: username,
            }
        })
    }
    else {
        return NextResponse.json({error: 'User name already exists'}, {status: 400})
    }

    const hashPassword = await bcrypt.hash(password, 10)

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
