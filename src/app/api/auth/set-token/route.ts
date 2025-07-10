import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.redirect('/login'); // Or show error
    }

    const hostname = req.headers.get('host')!;
    const currentSubdomain = hostname.split('.')[0];

    const res = NextResponse.redirect('/dashboard');
    res.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? `${currentSubdomain}.bhathiya.me` : 'localhost',
    });

    return res;
}
