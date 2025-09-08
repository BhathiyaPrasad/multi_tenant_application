'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function SiteHeader() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [type, setType] = useState("General")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const res = await fetch("/api/blogs/tenant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    Description: description,
                    content,
                    type,
                }),
            })

            if (!res.ok) {
                throw new Error("Failed to create blog")
            }

            setTitle("")
            setDescription("")
            setContent("")
            setType("General")
            setOpen(false)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">My Blogs</h1>

                <div className="ml-auto flex items-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="hidden lg:inline-flex">
                                Create Blog
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a new blog</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4 ">
                                <div>
                                    <Label htmlFor="title" className="mb-1">Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Input
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Save
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Button asChild variant="ghost" className="lg:hidden">
                        <a href="#">New</a>
                    </Button>
                </div>
            </div>
        </header>
    )
}
