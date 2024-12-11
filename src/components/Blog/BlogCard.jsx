import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = days[date.getDay()];
  const dateNum = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${dateNum} ${month} ${year}`;
};

const BlogCard = ({ author, content, created_at, img_file, title, views }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const colors = [
      "bg-emerald-500",
      "bg-emerald-400",
      "bg-emerald-600",
      "bg-slate-500",
      "bg-slate-400",
      "bg-slate-600",
    ];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <div className="rounded-md overflow-hidden hover:shadow-lg">
        <LazyLoadImage
          src={img_file}
          alt={title}
          className="w-full h-96 object-cover"
        />
      </div>
      <CardHeader className="space-y-4 flex-grow">
        <Badge
          variant="outline"
          className="bg-background text-emerald-600 border-2 border-emerald-600 max-w-max px-2 py-1 rounded-full"
        >
          {views} pemirsa
        </Badge>
        <Typography variant="h2" className="text-emerald-600 font-bold">
          {title}
        </Typography>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>
          <Typography variant="p" type="description" className="text-justify">
            {content.replace(/<[^>]*>/g, "").split(".")[0] + "."}
          </Typography>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col lg:flex-row items-start lg:items-center gap-4 text-emerald-600 mt-auto">
        <div className="flex items-start md:items-center">
          <Avatar
            className={`cursor-pointer ${bgColor} text-white shadow-md hidden lg:block`}
          >
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback>
              {author
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() || <User />}
            </AvatarFallback>
          </Avatar>
          <Typography
            variant="p-semibold"
            className="text-emerald-600 ml-0 lg:ml-4"
          >
            {author}
          </Typography>
        </div>
        <strong className="hidden lg:block">●</strong>
        <Typography variant="p-semibold" className="text-emerald-600">
          {formatDate(created_at)}
        </Typography>
      </CardFooter>
    </Card>
  );
};
export default BlogCard;
