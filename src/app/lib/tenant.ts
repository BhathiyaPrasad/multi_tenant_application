import { headers } from 'next/headers'

export async function getTenantSlugFromHeader() {
    const headersList =  await headers() // ✅ no await needed
    const slug = headersList.get('x-tenant-slug')
    if (!slug) throw new Error('Missing tenant header')
    return slug
}
