import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const token = url.searchParams.get('token')

        if (!token) {
            return NextResponse.redirect('/signin') // you can fix this similarly too if needed
        }

        const hostname = req.headers.get('host') || ''
        const subdomain = hostname.split('.')[0] || 'unknown'

        const baseUrl = `${url.protocol}//${url.host}`

        const res = NextResponse.redirect(`${baseUrl}/dashboard`)

        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            // domain: `${subdomain}.bhathiya.me` // optional, be careful here
        })

        return res
    } catch (err: any) {
        console.error('set-token route error:', err.message || err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
