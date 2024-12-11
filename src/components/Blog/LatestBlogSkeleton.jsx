import {Skeleton} from '@/components/ui/skeleton';

export const LatestBlogSkeleton = () => {
    return (
        <div className="rounded-lg">
            <Skeleton className="w-full h-[700px] object-cover"/>
        </div>
    )
}
