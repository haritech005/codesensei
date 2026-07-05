'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { addBookmark, removeBookmark } from '@/lib/actions/companions.actions';

interface BookmarkButtonProps {
  companionId: string;
  initialBookmarked: boolean;
  path: string;
}

export default function BookmarkButton({ companionId, initialBookmarked, path }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistically update the state
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);

    startTransition(async () => {
      try {
        if (nextBookmarked) {
          await addBookmark(companionId, path);
        } else {
          await removeBookmark(companionId, path);
        }
      } catch (error) {
        // Revert state on error
        setIsBookmarked(!nextBookmarked);
        console.error('Failed to update bookmark status:', error);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
      title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      <Image
        src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
        alt="bookmark"
        width={18}
        height={18}
        className={isPending ? "opacity-50" : ""}
      />
    </button>
  );
}
