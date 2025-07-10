'use client'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useState , useEffect} from "react";
import { Loader2 } from "lucide-react"
import {useRouter} from "next/navigation";

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [host, setHost] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const responseData = await response.json();

            console.log("response",responseData.tenantId)
            const tenantSlug = responseData.tenantId;
            const currentHost = window.location.hostname
            console.log("current host" , currentHost)
            const baseDomain = process.env.NODE_ENV === 'production' ? 'bhathiya.me' :  'localhost'; // or process.env.DOMAIN in prod

            const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';



            console.log(responseData.token)
            const token = responseData.token;
            const authenticate = await fetch('/api/auth/session-check', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token , tenantSlug}),
            });
            const authenticatedData = await authenticate.json()
            console.log("Authenticated Data", authenticatedData , tenantSlug);
            if(authenticatedData.message) {
                window.location.href = `${protocol}://${tenantSlug}.${baseDomain}/dashboard`;
            }
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'Sign in failed. Please try again.');
        } finally {
            setIsLoading(false);

        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Email and Password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">

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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>
            {error && (
                <Card className="border-destructive bg-destructive/10">
                    <CardContent className="p-1 text-destructive text-sm text-center">
                        {error}
                    </CardContent>
                </Card>
            )}

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
            <div
                className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
