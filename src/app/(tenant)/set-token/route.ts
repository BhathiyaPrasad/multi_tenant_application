import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');
        const tenantId = url.searchParams.get('tenant');
        const isProduction = process.env.NODE_ENV === 'production';
        const rootDomain = isProduction ? '.bhathiya.me' : '.localhost:3000';
        const protocol = isProduction ? 'https' : 'http';

        if (!token) {
            return NextResponse.redirect(new URL('/signin', url));
        }

        const res = NextResponse.redirect(new URL(`${protocol}://${tenantId}${rootDomain}/dashboard`));
        // const res = NextResponse.redirect(new URL(`http://${tenantId}.localhost:3000/dashboard`));
        res.cookies.set('token', token, {
            domain: `${tenantId}.bhathiya.me`,
            httpOnly: true,
            secure: isProduction, // true in production
            path: '/',
            sameSite: 'lax',
            // domain: rootDomain // Important for production
        });

        return res;
    } catch (error: any) {
        console.error("❌ /set-token error:", error.message || error);
        return NextResponse.redirect(new URL('/error', req.url));
    }
}