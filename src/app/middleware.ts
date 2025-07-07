import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
    // get the host name from the request headers
    const hostname = request.headers.get('host') || ''
    // remove the port number
    const currentHost = hostname.replace(':3000', '')
    //split the host by dots and get the first part
    const subdomain = currentHost.split('.')[0]

    const response = NextResponse.next()
    response.headers.set('x-tenant', subdomain)

    return response


}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
}
