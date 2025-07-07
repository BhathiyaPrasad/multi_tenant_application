'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function CreateTenantPage() {
    const [slug, setSlug] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/tenant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, name }),
        })

        if (res.ok) {
            router.push(`http://${slug}.localhost:3000/auth/signup`)
        } else {
            const data = await res.json()
            setError(data.error || 'Creation failed')
        }
    }

    return (
        <div className="max-w-md mx-auto  mt-50">
            <h2 className="text-2xl text-center font-bold mb-6">Create New Tenant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="slug" className='mb-2'>Tenant Slug :</Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="name" className='mb-2'>Tenant Name :</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="w-full">Create</Button>
            </form>
        </div>
    )
}
