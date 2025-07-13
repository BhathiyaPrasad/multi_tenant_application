'use client'

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function Navbar() {
    const [signedIn, setSignedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/session-check');
                const data = await response.json();
                setSignedIn(data.signedIn);
            } catch (error) {
                console.error("Error checking session:", error);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!searchTerm.trim()) {
                setBlogs([]);
                setShowResults(false);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            setShowResults(true);

            try {
                const url = `/api/blogs/search?search=${encodeURIComponent(searchTerm)}`;
                const res = await fetch(url);
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error('Search error:', error);
                setBlogs([]);
            } finally {
                setIsSearching(false);
            }
        };

        const debounceTimer = setTimeout(fetchBlogs, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const clearSearch = () => {
        setSearchTerm('');
        setShowResults(false);
        setBlogs([]);
    };

    const handleSearchFocus = () => {
        if (searchTerm.trim()) {
            setShowResults(true);
        }
    };

    return (
        <nav className="bg-background border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center relative">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold flex items-center gap-2">
                            <span>Blogger</span>
                        </Link>
                    </div>
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-lg" ref={searchRef}>
                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        type="search"
                                        placeholder="Search blogs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={handleSearchFocus}
                                        className="w-full pr-8"
                                    />
                                </div>
                            </div>
                            {showResults && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                                    {isSearching ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            Searching...
                                        </div>
                                    ) : blogs.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No blogs found for "{searchTerm}"
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            <div className="text-sm text-muted-foreground mb-2 px-2">
                                                {blogs.length} result{blogs.length !== 1 ? 's' : ''} found
                                            </div>
                                            <div className="space-y-2">
                                                {blogs.slice(0, 5).map((blog) => (
                                                    <div key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md p-2">
                                                        <Link
                                                            href={`/blogs/${blog.id}`}
                                                            onClick={() => setShowResults(false)}
                                                            className="block"
                                                        >
                                                            <h3 className="font-medium text-sm line-clamp-1">{blog.title}</h3>
                                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                                {blog.content}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {new Date(blog.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                            {blogs.length > 5 && (
                                                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                                                    <Link
                                                        href={`/blogs?search=${encodeURIComponent(searchTerm)}`}
                                                        onClick={() => setShowResults(false)}
                                                        className="block text-sm text-primary hover:underline text-center py-2"
                                                    >
                                                        View all {blogs.length} results
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <Link href="/blogs" className="text-sm font-medium hover:text-primary">
                            Blogs
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary">
                            About
                        </Link>
                        <Button asChild variant="outline" className="rounded-full hover:bg-black hover:text-white">
                            {signedIn ? (
                                <Link href="/dashboard">Dashboard</Link>
                            ) : (
                                <Link href="/signin">Sign In</Link>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="md:hidden mt-2 pb-4">
                    <div className="relative">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Input
                                    type="search"
                                    placeholder="Search blogs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={handleSearchFocus}
                                    className="w-full pr-8"
                                />

                            </div>
                        </div>
                        {showResults && (
                            <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                                {isSearching ? (
                                    <div className="p-4 text-center text-muted-foreground">
                                        Searching...
                                    </div>
                                ) : blogs.length === 0 ? (
                                    <div className="p-4 text-center text-muted-foreground">
                                        No blogs found for "{searchTerm}"
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        <div className="text-sm text-muted-foreground mb-2 px-2">
                                            {blogs.length} result{blogs.length !== 1 ? 's' : ''} found
                                        </div>
                                        <div className="space-y-2">
                                            {blogs.slice(0, 3).map((blog) => (
                                                <div key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md p-2">
                                                    <Link
                                                        href={`/blogs/${blog.id}`}
                                                        onClick={() => setShowResults(false)}
                                                        className="block"
                                                    >
                                                        <h3 className="font-medium text-sm line-clamp-1">{blog.title}</h3>
                                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                            {blog.content}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(blog.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                        {blogs.length > 3 && (
                                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                                                <Link
                                                    href={`/blogs?search=${encodeURIComponent(searchTerm)}`}
                                                    onClick={() => setShowResults(false)}
                                                    className="block text-sm text-primary hover:underline text-center py-2"
                                                >
                                                    View all {blogs.length} results
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}