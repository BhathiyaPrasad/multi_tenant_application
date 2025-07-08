import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
// Mock blog data
const featuredBlogs = [
    {
        id: 1,
        title: "Getting Started with Next.js",
        description: "Learn how to set up a new project with Next.js and build your first application.",
        author: "Jane Doe",
        date: "May 15, 2023",
        category: "Tutorial",
        imageUrl: "/placeholder-blog-1.jpg",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Modern CSS Techniques",
        description: "Explore the latest CSS features that will make your websites stand out.",
        author: "John Smith",
        date: "June 2, 2023",
        category: "CSS",
        imageUrl: "/placeholder-blog-2.jpg",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "TypeScript Best Practices",
        description: "Level up your TypeScript skills with these professional patterns.",
        author: "Alex Johnson",
        date: "June 10, 2023",
        category: "TypeScript",
        imageUrl: "/placeholder-blog-3.jpg",
        readTime: "12 min read"
    },
];

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                                BlogApp
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
                                <Link href="/api/auth/signin">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Welcome to BlogApp
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

            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Posts</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredBlogs.map((blog) => (
                            <Card key={blog.id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                                        <Image
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <Badge variant="outline" className="mb-2">
                                        {blog.category}
                                    </Badge>
                                    <CardTitle className="mb-2 text-xl">{blog.title}</CardTitle>
                                    <CardDescription className="mb-4 line-clamp-2">
                                        {blog.description}
                                    </CardDescription>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`/avatars/${blog.author.toLowerCase().replace(' ', '-')}.jpg`} />
                                            <AvatarFallback>{blog.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{blog.author}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {blog.date} · {blog.readTime}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/blogs/${blog.id}`}>Read More</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button variant="ghost" asChild>
                            <Link href="/blogs">View All Posts</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300">
                    <p>© {new Date().getFullYear()} BlogApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}