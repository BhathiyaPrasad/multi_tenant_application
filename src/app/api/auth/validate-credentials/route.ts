import {NextResponse, NextRequest} from "next/server";
import prisma from '@/app/lib/prisma';
import bcrypt from "bcrypt";




export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password} = body;
    if (!email) {
        return NextResponse.json({error: 'Invalid Email'}, {status: 400})
    }
    else if (!password || password.length < 6) {
        return NextResponse.json({error: 'Invalid Password'}, {status: 400})
    }
    console.log(body)

    const existing = await prisma.user.findFirst({
        where: {email}
    })
    if (existing) return NextResponse.json({error: 'User exists'}, {status: 400})



    return NextResponse.json({message: 'New User'})
}
