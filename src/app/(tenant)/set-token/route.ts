import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.redirect('/login'); // Or show error
    }

    const hostname = req.headers.get('host')!;
    const subdomain = hostname.split('.')[0];

    const res = NextResponse.redirect('/dashboard');

    res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        domain: process.env.NODE_ENV === 'production' ? `${subdomain}.bhathiya.me` : 'localhost',
    });

    return res;
}
