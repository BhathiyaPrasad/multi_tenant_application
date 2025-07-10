import { NextRequest, NextResponse } from 'next/server'

// Inside app/(tenant)/set-token/route.ts
// app/(tenant)/set-token/route.ts
// app/(tenant)/set-token/route.ts
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');

        if (!token) {
            return NextResponse.redirect(new URL('/signin', url));
        }

        // Create response with proper redirect
        const res = NextResponse.json({ message: 'Signed in'})
        // Set cookie for current subdomain only
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax' // or 'none' if needed
        });

        return res;
    } catch (error: any) {
        console.error("❌ /set-token error:", error.message || error);
        return NextResponse.redirect(new URL('/error', req.url));
    }
}