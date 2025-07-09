import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET!


export function middleware(request: NextRequest) {
    // get the host name from the request headers
    const hostname = request.headers.get('host') || ''
    // remove the port number
    const currentHost = hostname.replace(':3000', '')
    //split the host by dots and get the first part
    const subdomain = currentHost.split('.')[0]


    const token = request.cookies.get('token')?.value
    const nextUrl = request.nextUrl
    const pathname = nextUrl.pathname

    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        try {
            jwt.verify(token, JWT_SECRET)
        } catch (err) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }




    const response = NextResponse.next()
    response.headers.set('x-tenant', subdomain)
    console.log(response)
    return response


}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
}
