import {Navbar} from "@/components/navbar";
import {BookOpen, User, Database, Layers} from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar/>

            <main className="flex-1 w-full">
                <section className="w-full py-16">
                    <div className="max-w-4xl mx-auto px-4 space-y-16">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <BookOpen className="h-12 w-12 text-primary"/>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Powerful Content Management</h2>
                                <p className="text-lg text-muted-foreground">Create, read, update, and delete your blog
                                    posts with ease in your personal tenant subdomain.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <User className="h-12 w-12 text-primary"/>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">User Authentication & Dashboard</h2>
                                <p className="text-lg text-muted-foreground">Secure sign-up and login with a dashboard
                                    tailored to your blogging needs.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <Database className="h-12 w-12 text-primary"/>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Robust Data Handling</h2>
                                <p className="text-lg text-muted-foreground">Powered by Prisma and PostgreSQL for
                                    reliable and scalable backend data management.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <Layers className="h-12 w-12 text-primary"/>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Clean Architecture</h2>
                                <p className="text-lg text-muted-foreground">Designed for scalability and
                                    maintainability with modern full-stack technologies.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}