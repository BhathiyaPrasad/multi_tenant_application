'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

export function SignForm({ className, ...props }: React.ComponentProps<"div">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1) // 1 = email/password, 2 = username

    const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/validate-credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Validation failed')
            }

            setStep(2)
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'Validation failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUsernameSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Final submission with all fields
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            })

            if (!response.ok) {
                throw new Error('User name already exists')
            }

            window.location.href = '/dashboard'
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {step === 1 ? (
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Create your account</CardTitle>
                        <CardDescription>Start by entering your email and password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleEmailPasswordSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        placeholder="m@example.com"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Checking..." : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Choose your username</CardTitle>
                        <CardDescription>
                            This will be used for your profile URL <br/>(e.g., {username || 'yourname'}.blogger.com)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUsernameSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        placeholder="yourname"
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        minLength={3}
                                        maxLength={20}
                                        pattern="[a-zA-Z0-9]+"
                                        title="Only letters and numbers, no spaces"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Creating account..." : "Complete Registration"}
                                </Button>

                            </div>
                        </form>

                    </CardContent>

                </Card>
            )}

            {error && (
                <Card className="border-destructive bg-destructive/10">
                    <CardContent className="p-1 text-destructive text-sm text-center">
                        {error}
                    </CardContent>
                </Card>
            )}
            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/signin" className="underline underline-offset-4">
                    Sign In
                </a>
            </div>


            <div className="text-muted-foreground text-center text-xs">
                By clicking continue, you agree to our <a href="#" className="underline underline-offset-4">Terms of Service</a> and <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
            </div>
        </div>
    )
}