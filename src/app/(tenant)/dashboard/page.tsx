'use client'
import {AppSidebar} from "@/components/app-sidebar"
import {SectionCards} from "@/components/section-cards"
import {SiteHeader} from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {useEffect, useState} from "react";


export default function Page() {
    const [blogs, setBlogs] = useState([]);


    const getPrivateBlogs = async () => {
        try {
            const response = await fetch('/api/blogs/tenant');
            const data = await response.json();
            setBlogs(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };


    useEffect(() => {
        getPrivateBlogs().then(r => console.log("Blog Fetching End Point Called"));
    }, [])

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset"/>
            <SidebarInset>
                <SiteHeader onBlogCreated={getPrivateBlogs}/>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards blogs={blogs}/>
                            <div className="px-4 lg:px-6">

                            </div>

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
