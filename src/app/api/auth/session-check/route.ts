import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)


export async function GET(request: Request) {
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0]

    if (!token) return NextResponse.json({ signedIn: false }, { status: 401 })

    try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.json({ signedIn: true }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ signedIn: false }, { status: 401 })
    }
}
