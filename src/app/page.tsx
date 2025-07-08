import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
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
                                <Link href="/signin">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="flex-1">
                <div className="relative overflow-hidden">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                        <div className="relative z-10">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Welcome to <span className="text-primary">Blogger</span>
                            </h1>
                            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                                Discover insightful articles, tutorials, and news about web development and design.
                            </p>
                            <div className="mt-10 flex gap-4 justify-center">
                                <Button asChild size="lg">
                                    <Link href="/blogs">Explore Blogs</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-secondary/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Blogger?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>Easy Writing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Our intuitive editor makes writing and formatting your posts a breeze.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>Powerful Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Track your readership and engagement with detailed statistics.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>Vibrant Community</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Connect with other writers and readers in our growing community.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Stay Updated</h2>
                        <p className="text-muted-foreground">
                            Subscribe to our newsletter for the latest posts and updates.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 max-w-md"
                            />
                            <Button type="submit">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-background border-t py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Blogger</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                                Terms
                            </Link>
                            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                                Contact
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Bhathiya Prasad. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}