// app/(tenant)/set-token/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const token = url.searchParams.get('token')

        console.log("🔑 token received:", token)

        if (!token) {
            console.warn("❌ Token is missing")
            return NextResponse.redirect('/signin')
        }

        const hostname = req.headers.get('host') || ''
        const subdomain = hostname.split('.')[0] || 'unknown'

        console.log("🌐 Subdomain:", subdomain)

        const res = NextResponse.redirect('/dashboard')

        // ✅ Optional: Try without domain first to rule out domain-related crash
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            // domain: `${subdomain}.bhathiya.me` ← comment out to test
        })

        console.log("✅ Token cookie set, redirecting...")

        return res
    } catch (err: any) {
        console.error("❌ set-token route error:", err.message || err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
