'use client'
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <Skeleton className="mx-auto h-10 w-64 sm:w-80" />
                <Skeleton className="mx-auto mt-4 h-5 w-48" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4 rounded-lg border p-4">
                        <Skeleton className="h-48 w-full rounded-t-lg" />
                        <Skeleton className="h-6 w-20" />

                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-4/5" />

                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-3/4" />

                        <div className="flex items-center gap-3 pt-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>

                        <Skeleton className="h-9 w-full" />
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <Skeleton className="h-9 w-32" />
            </div>
        </div>
    );
}