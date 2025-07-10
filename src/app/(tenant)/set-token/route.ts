import { NextRequest, NextResponse } from 'next/server'

// Inside app/(tenant)/set-token/route.ts
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');

        if (!token) {
            return NextResponse.redirect(`${url.protocol}//${url.host}/signin`);
        }

        const res = NextResponse.redirect(`${url.protocol}//${url.host}/dashboard`);

        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
        });

        return res;
    } catch (error: any) {
        console.error("❌ /set-token error:", error.message || error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

