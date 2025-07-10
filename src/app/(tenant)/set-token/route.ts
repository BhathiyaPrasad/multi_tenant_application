import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    console.log('🔥 Hit /set-token route');

    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');
        if (!token)  return NextResponse.redirect('/login')

        const hostname = req.headers.get('host') || '';
        const subdomain = hostname.split('.')[0];
        console.log(`Subdomain: ${subdomain}`);

        const response = NextResponse.redirect('/dashboard');
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            domain: process.env.NODE_ENV === 'production' ? `${subdomain}.bhathiya.me` : 'localhost',
        });

        console.log('✅ Token set successfully');
        return response;
    } catch (err) {
        console.error('❌ Error in /set-token route:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
