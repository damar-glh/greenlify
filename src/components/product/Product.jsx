import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Typography} from "@/components/ui/Typography";
import {Button} from "@/components/ui/button";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Badge} from "@/components/ui/badge";

const Product = ({category_name, contact, img_file, price, title, description}) => {
    return (
        <Card className="flex flex-col h-full">
            <div className="rounded-md overflow-hidden">
                <LazyLoadImage src={img_file} alt={title} className="w-full h-96 object-cover"/>
            </div>
            <CardHeader className="space-y-4 flex-grow">
                <Badge
                    variant="default"
                    className="bg-emerald-500 text-white max-w-max px-2 py-1 rounded-full"
                >
                    {category_name}
                </Badge>
                <Typography variant="h2" className="text-emerald-600 font-bold">
                    {title}
                </Typography>
                <Typography variant="large" className="text-emerald-600 font-semibold">
                    Rp. {price}
                </Typography>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription>
                    <Typography variant="p" type="description" className="text-justify">
                        {description.split('.').slice(0, 1).join('.') + '.'}
                    </Typography>
                </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto">
                <a
                    href={contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                >
                    <Button variant="outline" className="px-4 py-2 w-full shadow-lg">
                        Hubungi
                    </Button>
                </a>
            </CardFooter>
        </Card>
    )

};

export default Product;