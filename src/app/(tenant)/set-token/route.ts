// import { NextRequest, NextResponse } from 'next/server'

// app/(tenant)/set-token/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        status: 'SUCCESS',
        message: 'Route exists'
    });
}