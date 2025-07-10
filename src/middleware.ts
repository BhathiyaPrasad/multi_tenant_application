import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)


export async function middleware(request: NextRequest) {
    // get the host name from the request headers
    const hostname = request.headers.get('host') || ''
    // remove the port number
    const currentHost = hostname.replace(':3000', '')
    //split the host by dots and get the first part
    const subdomain = currentHost.split('.')[0]


    const nextUrl = request.nextUrl
    const pathname = nextUrl.pathname

    const token = request.cookies.get('token')?.value

    if (pathname.startsWith('/dashboard')) {
        if (!token) return NextResponse.redirect(new URL('/signin', request.url))

        try {
            await jwtVerify(token, JWT_SECRET)
        } catch {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }
    if (subdomain !== 'www' && currentHost.endsWith('.bhathiya.me')) {
        request.nextUrl.pathname = `/${request.nextUrl.pathname}`;
        return NextResponse.rewrite(request.nextUrl);
    }


    const response = NextResponse.next()
    response.headers.set('x-tenant', subdomain)
    console.log(response)
    return response


}
export const config = {
    matcher: ['/dashboard/:path*' , '/set-token'],
}
