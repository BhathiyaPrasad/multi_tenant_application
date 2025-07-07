'use client'
import Image from "next/image";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";
import BlogLoading from "@/app/ui-components/page";

const blogs = [
    {
        id: 1,
        title: "Getting Started with Next.js and Shadcn",
        description: "Learn how to set up a new project with Next.js and integrate Shadcn UI components.",
        author: "Jane Doe",
        date: "May 15, 2023",
        readTime: "5 min read",
        category: "Tutorial",
        imageUrl: "/placeholder-blog-1.jpg"
    },
    {
        id: 2,
        title: "Building Accessible Web Applications",
        description: "Best practices for creating web applications that everyone can use.",
        author: "John Smith",
        date: "June 2, 2023",
        readTime: "8 min read",
        category: "Accessibility",
        imageUrl: "/placeholder-blog-2.jpg"
    },
    {
        id: 3,
        title: "Advanced TypeScript Patterns",
        description: "Explore advanced TypeScript techniques for your Next.js projects.",
        author: "Alex Johnson",
        date: "June 10, 2023",
        readTime: "12 min read",
        category: "Development",
        imageUrl: "/placeholder-blog-3.jpg"
    },
];

export default function BlogPage() {
    const [loading, setLoading] = useState(true);



    setTimeout(() => {
        setLoading(false);
    }, 2000);

    if (loading) return
    <BlogLoading/>;


    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Blog</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Insights, tutorials, and news from our team
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
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
                                    <AvatarImage src={`/avatars/${blog.author.toLowerCase().replace(' ', '-')}.jpg`}/>
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
                            <Button variant="outline" className="w-full">
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <Button variant="ghost">
                    Load More Articles
                </Button>
            </div>
        </div>
    );
}