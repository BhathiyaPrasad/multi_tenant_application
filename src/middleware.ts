import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const currentHost = hostname.replace(':3000', '')
    const subdomain = currentHost.split('.')[0]

    const token = request.cookies.get('token')?.value
    const nextUrl = request.nextUrl
    const pathname = nextUrl.pathname

    console.log('🔍 Middleware running for:', pathname);
    console.log('🍪 Token in middleware:', token);
    console.log('🏠 Hostname:', hostname);

    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            console.log('⚠️ No token — redirecting to /signin');
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        try {
            jwt.verify(token, JWT_SECRET);
        } catch (err) {
            console.log('❌ Token invalid — redirecting to /signin');
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    const response = NextResponse.next();
    response.headers.set('x-tenant', subdomain);
    return response;
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
