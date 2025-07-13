import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { BookOpen, User, Database, Layers } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />

            <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 gap-10 max-w-3xl mx-auto">
                <Card className="w-full shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-4xl font-extrabold text-center mb-2">About Blogger</CardTitle>
                        <p className="text-center text-muted-foreground max-w-xl mx-auto text-lg">
                            A modern, multi-tenant blogging platform built with Next.js & TypeScript.
                        </p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-6 mt-6 text-lg leading-relaxed">
                        <section className="flex items-start gap-4">
                            <BookOpen className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-1">Powerful Content Management</h3>
                                <p>Create, read, update, and delete your blog posts with ease in your personal tenant subdomain.</p>
                            </div>
                        </section>

                        <section className="flex items-start gap-4">
                            <User className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-1">User Authentication & Dashboard</h3>
                                <p>Secure sign-up and login with a dashboard tailored to your blogging needs.</p>
                            </div>
                        </section>

                        <section className="flex items-start gap-4">
                            <Database className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-1">Robust Data Handling</h3>
                                <p>Powered by Prisma and PostgreSQL for reliable and scalable backend data management.</p>
                            </div>
                        </section>

                        <section className="flex items-start gap-4">
                            <Layers className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-xl mb-1">Clean Architecture</h3>
                                <p>Designed for scalability and maintainability with modern full-stack technologies.</p>
                            </div>
                        </section>
                    </CardContent>

                    <div className="flex justify-center mt-8 pb-8">
                        <Button asChild size="lg" variant="default">
                            <Link href="/blogs">Explore Blogs</Link>
                        </Button>
                    </div>
                </Card>

                <Card className="w-full max-w-3xl shadow-md bg-muted">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center mb-2">Why Choose Blogger?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center text-muted-foreground text-base">
                        <p>Simple and intuitive interface for both beginners and pros.</p>
                        <p>Multi-tenancy keeps your content organized and private.</p>
                        <p>Open-source tools and frameworks for easy customization.</p>
                        <p>Responsive design for seamless experience on any device.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
