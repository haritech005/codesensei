import Image from "next/image";
import Link from "next/link";

import BookmarkButton from "./BookmarkButton";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    isBookmarked?: boolean;
    path: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color, isBookmarked = false, path }: CompanionCardProps) => {
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">
                    {subject}
                </div>
                <BookmarkButton companionId={id} initialBookmarked={isBookmarked} path={path} />
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image src={"/icons/clock.svg"} alt="clock" width={13.5} height={13.5} />
                <p className="text-sm">{duration} min duration</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>

        </article>
    )
}

export default CompanionCard