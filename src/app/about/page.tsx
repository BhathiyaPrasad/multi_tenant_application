import React from "react";



export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">About Blogger</h1>
            <p className="text-lg mb-2">
                Blogger is a simple blogging platform built with Next.js and TypeScript.
            </p>
            <p className="text-lg mb-2">
                It allows users to create, read, update, and delete blog posts.
            </p>
            <p className="text-lg mb-2">
                The platform features user authentication, allowing users to sign up and log in.
            </p>
            <p className="text-lg mb-2">
                This project is designed to demonstrate the capabilities of Next.js and TypeScript in building modern web applications.
            </p>
        </div>
    );
}