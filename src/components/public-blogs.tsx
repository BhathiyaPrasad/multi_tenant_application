import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Blog = {
    id: string
    title: string
    content: string
    createdAt: string
    type: string
    Description: string
}

export function PublicBlogList({ blogs }: { blogs: Blog[] }) {
    if (!blogs || blogs.length === 0) {
        return <p className="p-4 text-center text-muted-foreground">No blogs found.</p>
    }

    return (
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
                <Card key={blog.id} className="bg-card shadow-sm hover:shadow-md transition-all">
                    <CardHeader>
                        <Badge variant="outline" className="mb-2 w-fit capitalize">{blog.type}</Badge>
                        <CardTitle className="text-xl">{blog.title}</CardTitle>
                        <CardDescription className="line-clamp-4">{blog.Description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col items-start gap-2 px-6 pb-6 text-sm text-muted-foreground">
                        <p className="line-clamp-3">{blog.content}</p>
                        <span className="text-xs text-gray-500">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
