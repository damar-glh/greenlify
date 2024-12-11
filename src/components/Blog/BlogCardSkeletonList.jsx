import {BlogCardSkeleton} from "@/components/Blog/BlogCardSkeleton";
import React from "react";

export default function BlogCardSkeletonList({count}) {
    return (
        <>
            {Array.from({length: count}).map((_, index) => (
                <BlogCardSkeleton key={index}/>
            ))}
        </>
    );
}