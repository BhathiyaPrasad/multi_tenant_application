import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    const currentHost = hostname.replace(':3000', '')
    const subdomain = currentHost.split('.')[0]

    const pathname = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    if (pathname.startsWith('/dashboard')) {
        if (!token) return NextResponse.redirect(new URL('/signin', request.url))
        try {
            await jwtVerify(token, JWT_SECRET)
        } catch {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }

    const isLocalhost = currentHost === 'localhost'
    const isSubdomain = !isLocalhost && currentHost.split('.').length > 2
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-tenant", subdomain)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    response.headers.set("x-tenant", subdomain)


    if (isSubdomain || isLocalhost) {
        request.nextUrl.pathname = request.nextUrl.pathname.startsWith('/')
            ? request.nextUrl.pathname
            : `/${request.nextUrl.pathname}`;

        return NextResponse.rewrite(request.nextUrl)
    }


    return response
}

export const config = {
    matcher: ['/dashboard/:path*', '/set-token'  ,'/about' ,'/api/:path*'],
}
