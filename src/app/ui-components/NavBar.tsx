'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function NavBar() {

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/session-check');
                const data = await response.json();
                setSignedIn(data.signedIn);
            } catch (error) {
                console.error("Error checking session:", error);
            }
        };

        checkSession().then(r => console.log("Session checked successfully"));
    }, []);





    return (
    <div className="min-h-screen flex flex-col">
        <nav className="bg-background border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold flex items-center gap-2">
                            <span>Blogger</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/blogs"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            About
                        </Link>
                        <Button asChild variant="outline" className="rounded-full hover:bg-black hover:text-white">
                            {signedIn ?
                                <Link href="/dashboard">Dashboard</Link>
                                :
                                <Link href="/signin">Sign In</Link>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
        )
    }