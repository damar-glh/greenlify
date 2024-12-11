import {Skeleton} from '@/components/ui/skeleton';
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";

export const BlogCardSkeleton = () => {
    return (
        <Card>
            <div className="rounded-md">
                <Skeleton className="w-full h-96 object-cover"/>
            </div>
            <CardHeader className="space-y-4">
                <Skeleton className="max-w-max px-2 py-1 rounded-full"/>
                <Skeleton className="w-3/4 h-8"/>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <Skeleton className="w-full h-6"/>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col lg:flex-row items-start lg:items-center gap-4 text-emerald-600">
                <div className="flex items-start md:items-center">
                    <Skeleton className="w-10 h-10 rounded-full"/>
                    <Skeleton className="ml-4 w-24 h-6"/>
                </div>
                <Skeleton className="w-5 h-5 rounded-full hidden lg:block"></Skeleton>
                <Skeleton className="w-32 h-6"/>
            </CardFooter>
        </Card>
    )
}