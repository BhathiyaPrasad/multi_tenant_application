import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    console.log('🧠 Middleware is running for:', pathname)
    console.log('🍪 Token:', token)

    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            console.log('🚫 No token. Redirecting to /signin')
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        try {
            jwt.verify(token, JWT_SECRET)
            console.log('✅ Token verified.')
        } catch (err) {
            console.log('❌ Invalid token. Redirecting to /signin')
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
