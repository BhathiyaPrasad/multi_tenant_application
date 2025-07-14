import { IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
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

export function SectionCards({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) {
    return <p className="p-4 text-center text-muted-foreground">No blogs found.</p>
  }

  return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {blogs.map((blog) => (
            <Card key={blog.id} className="@container/card">
              <CardHeader>
                <CardDescription>{blog.Description}</CardDescription>
                <CardTitle className="text-1xl font-semibold @[250px]/card:text-1xl">
                  {blog.title}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <IconTrendingUp className="size-4" />
                    {blog.type}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-2">{blog.content}</div>
                <div className="text-muted-foreground text-xs">
                  Created: {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
        ))}
      </div>
  )
}
