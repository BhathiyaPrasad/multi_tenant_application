import {NextResponse , NextRequest} from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getTenantSlugFromHeader} from "@/app/lib/tenant";


const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email , password} = body;

    const tenantSlug = await getTenantSlugFromHeader();

    const tenant = await prisma.tenant.findUnique({where: {slug: tenantSlug}});
    if (!tenant){
        return NextResponse.json({error: 'Tenant not found'}, {status: 404})
    }
    const user = await prisma.user.findFirst({where: {email, tenantId: tenant.id}});
    if (!user) {
        return NextResponse.json({error: 'User not found'}, {status: 404})
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return NextResponse.json({error: 'Invalid password'}, {status: 401})
    }
    const token = jwt.sign(
        { userId: user.id, tenantId: user.tenantId },
        JWT_SECRET,
        { expiresIn: '7d' }
    )

    const res = NextResponse.json({ message: 'Signed in' })
    res.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    })
    console.log(res)
    return res
}