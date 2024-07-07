"use client"

import { getFollowers } from "@/lib/actions/user.action";
import { getFollowing } from "@/lib/actions/user.action";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { TotalLikes } from './TotalLikes';

export const ProfileDetails = ({ userId }: { userId: string }) => {

    const [followers, setFollowers] = useState([]);
    const [followersCount, setFollowersCount] = useState("-")
    const [following, setFollowing] = useState([]);
    const [followingCount, setFollowingCount] = useState("-");
    const parsedId = JSON.parse(userId);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const followersData = await getFollowers({ userId: parsedId })

                setFollowers(followersData.followers);
                setFollowersCount(followersData.followersNumber);

                const followingData = await getFollowing({ userId: parsedId })

                setFollowing(followingData.following);
                setFollowingCount(followingData.followingNumber);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchDetails();
    }, [userId]);

    return (
        <>
            <div onClick={() => router.push(`${pathname}/following`)} className="flex flex-col items-center cursor-pointer gap-1.5 px-3">
                <span className="font-bold">{followingCount}</span>
                <span className="text-light-3">Following</span>
            </div>

            <div className="thread-card_bar h-8 w-0.5" />

            <div onClick={() => router.push(`${pathname}/followers`)} className="flex flex-col items-center cursor-pointer gap-1.5 px-3">

                <span className="font-bold">{followersCount}</span>
                <span className="text-light-3">Followers</span>

            </div>

            <div className="thread-card_bar h-8 w-0.5" />

            <TotalLikes userId={userId} />
        </>
    )
}