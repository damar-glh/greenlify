import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "lucide-react";
import {Typography} from "@/components/ui/Typography";
import React, {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import {id} from "date-fns/locale";

const formatTimeAgo = (dateString) => {
    try {
        if (!dateString) {
            return 'Just now';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return 'Unknown date';
        }
        return formatDistanceToNow(date, {addSuffix: true, locale: id});
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

const CommentCard = ({username, created_at, comment, email}) => {
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        const colors = ["bg-emerald-500", "bg-emerald-400", "bg-emerald-600", "bg-slate-500", "bg-slate-400", "bg-slate-600"];
        setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }, []);

    return (
        <div
            className="border-2 border-slate-100 rounded-lg p-4 md:p-8 shadow-md"
        >
            <div className="flex flex-col md:flex-row content-start px-0 md:px-14">
                <div className="flex  md:items-center gap-4">
                    <Avatar
                        className={`cursor-pointer ${bgColor} text-white shadow-md`}>
                        <AvatarImage src="" alt="User avatar"/>
                        <AvatarFallback>
                            {username.split(' ').map(word => word[0]).join('').toUpperCase() ||
                                <User/>}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <Typography
                            variant="h4"
                            className="text-slate-900"
                        >
                            {username}
                        </Typography>
                        <Typography variant="p" className="text-slate-700">
                            {formatTimeAgo(created_at)}
                        </Typography>
                    </div>
                </div>
            </div>
            <Typography
                variant="p"
                className="text-slate-700 text-justify my-4 px-4 md:px-14"
            >
                {comment}
            </Typography>
            {/*<Typography*/}
            {/*    variant="p-semibold"*/}
            {/*    className="text-emerald-600 text-end mt-4 px-4 md:px-14"*/}
            {/*>*/}
            {/*    email: {email}*/}
            {/*</Typography>*/}
        </div>
    )
}

export default CommentCard;