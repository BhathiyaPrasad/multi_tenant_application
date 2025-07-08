import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                                Blogger
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/blogs" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Blogs
                            </Link>
                            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                About
                            </Link>
                            <Button asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Welcome to Blogger
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Discover insightful articles, tutorials, and news about web development and design.
                    </p>
                    <div className="mt-10">
                        <Button asChild size="lg">
                            <Link href="/blogs">Explore Blogs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300">
                    <p>© {new Date().getFullYear()} BhathiyaPrasad. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}