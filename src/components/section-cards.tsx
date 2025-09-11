'use client'
import {useState} from "react";
import {Badge} from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconTrendingUp, IconPencil, IconTrash } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Blog = {
    id: string
    title: string
    content: string
    createdAt: string
    type: string
    Description: string
}

type SectionCardsProps = {
    blogs: Blog[];
    onBlogUpdated?: () => void;
};


export function SectionCards({ blogs, onBlogUpdated }: SectionCardsProps) {

    const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

    async function handleDelete(blogId: string): Promise<void> {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            const response = await fetch(`/api/blogs/tenant/${blogId}`,
                {method: 'DELETE'});
            if (response.ok) {
                console.log("Blog Deleted");
                // alert("Blog deleted successfully");
            } else {
                console.log("Error while deleting this blog");
                // alert("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            // alert("An error occurred while deleting the blog");
        }finally {
            onBlogUpdated?.()
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!editingBlog) return;
        const updatedBlog = {
            title: editingBlog.title,
            Description: editingBlog.Description,
            content: editingBlog.content,
            type: editingBlog.type,
        };
        console.log(updatedBlog);
        try {
            const response = await fetch(`/api/blogs/tenant/${editingBlog.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedBlog),
            });
            if (response.ok) {
                // alert("Blog updated successfully");
                setEditingBlog(null);
            } else {
                // alert("Failed to update blog");
                console.error("Error deleting blog:");
            }
        }
        catch (error) {
            console.error("Error updating blog:", error);
            // alert("An error occurred while updating the blog");
        }finally {
            onBlogUpdated?.()
        }
    }

    if (!blogs || blogs.length === 0) {
        return <p className="p-4 text-center text-muted-foreground">No blogs found.</p>
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {blogs.map((blog) => (
                    <Card key={blog.id} className="@container/card">
                        <CardHeader>
                            <Badge variant="outline">
                                <IconTrendingUp className="size-4" />
                                {blog.type}
                            </Badge>
                            <CardDescription className="line-clamp-1">{blog.Description}</CardDescription>
                            <CardTitle className="text-1xl font-semibold @[250px]/card:text-1xl">
                                {blog.title}
                            </CardTitle>

                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-2">{blog.content}</div>
                            <div className="text-muted-foreground text-xs">
                                Created: {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                            <CardAction className="flex gap-2 mt-10 pl-35">

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingBlog(blog)}
                                >
                                    <IconPencil className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(blog.id)}
                                >
                                    <IconTrash className="size-4 text-red-500" />
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {editingBlog && (
                <Dialog open={!!editingBlog} onOpenChange={() => setEditingBlog(null)}>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Edit Blog</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={editingBlog.title}
                                    onChange={(e) =>
                                        setEditingBlog({ ...editingBlog, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={editingBlog.Description}
                                    onChange={(e) =>
                                        setEditingBlog({ ...editingBlog, Description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={editingBlog.content}
                                    onChange={(e) =>
                                        setEditingBlog({ ...editingBlog, content: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    value={editingBlog.type}
                                    onChange={(e) =>
                                        setEditingBlog({ ...editingBlog, type: e.target.value })
                                    }
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
