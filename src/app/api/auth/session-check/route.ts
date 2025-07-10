import { NextResponse , NextRequest } from 'next/server'
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


export async function POST(req: NextRequest) {
    const body = await req.json();
    const {token , tenantSlug} = body;
    const res = NextResponse.json({ message: 'Authenticated'  })
    res.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? `${tenantSlug}.bhathiya.me` : 'localhost',

    });
    console.log("Authenticated Success" , tenantSlug);
    return res;
}