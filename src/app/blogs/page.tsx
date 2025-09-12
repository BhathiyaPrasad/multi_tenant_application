'use client'

import {useEffect , useState} from "react";
import { PublicBlogList } from "@/components/public-blogs";
import {Navbar} from "@/components/navbar";



export default function BlogPage() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch('/api/public/blogs');
        const data = await response.json();
        setBlogs(data);
        console.log(data);
      } catch (error) {
        setBlogs([])
        console.error("Error checking Blogs:", error);

      }
    };

    getBlogs().then(r => console.log("Blogs checked successfully"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex-1 m-10">
        <PublicBlogList blogs={blogs} />
      </div>
    </div>
  )
}