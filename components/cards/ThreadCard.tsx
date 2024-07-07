import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ActionsMenu } from "./ActionsMenu";
import { DeleteButton } from "./DeleteButton";
import { LikeButton } from "./LikeButton";
import { fetchUser } from "@/lib/actions/user.action";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import './post.css'
import FollowButton from "../shared/ProfileImage";
import ProfileImage from "../shared/ProfileImage";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    image?: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
}

const ThreadCard = async ({
    id,
    currentUserId,
    parentId,
    content,
    image,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props) => {
    const userInfo = await fetchUser(currentUserId)
    const post = await fetchThreadById(id)

    return (
        <>
            <article className={`flex xs:w-screen md:w-full flex-col relative ${isComment ? 'px-0 xs:px-7 pb-6' : ' md:bg-dark-2 p-5 -mx-6'} `}>
                <div className="flex items-start justify-between relative">
                    <div className="flex w-full flex-1 flex-row gap-4">
                        <div className="flex flex-col items-center relative">
                            <ProfileImage author={JSON.stringify(author)} userId={JSON.stringify(userInfo._id)} />

                            <div className="thread-card_bar" />
                        </div>

                        <div className="flex w-full flex-col">
                            <Link href={`/profile/${author.id}`} className="w-fit">
                                <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                            </Link>

                            <p className="mt-2 text-small-regular text-light-2">{content}</p>


                            <div className={`${image && "max-w-4xl"} mt-5 flex flex-col gap-3`}>

                                {image ? (
                                    <div className="relative image-container w-full object-cover">
                                        <Image
                                            src={image}
                                            alt="post image"
                                            fill
                                            className="object-cover rounded-lg mt-1"
                                        />
                                    </div>
                                ) : null}

                                <div className={`flex relative gap-3.5 ${image && "mt-3"}`}>

                                    <LikeButton id={JSON.stringify(id)} currentUserId={JSON.stringify(userInfo._id)} post={JSON.stringify(post)} />

                                    <Link className="flex flex-col gap-1.5 items-center" href={`/thread/${id}`}>
                                        <Image
                                            src={"/assets/reply.svg"}
                                            alt="comment"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer object-contain"
                                        />
                                    </Link>

                                    <div className="flex flex-col gap-1.5 items-center">
                                        <Image
                                            src={"/assets/repost.svg"}
                                            alt="repost"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer object-contain"
                                        />
                                    </div>

                                    {author.id === currentUserId && (
                                        <DeleteButton postId={id} />
                                    )}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                {!isComment && comments.length > 0 && (
                    <div className='ml-1 mt-3 flex items-center gap-2'>
                        {comments.slice(0, 2).map((comment, index) => (
                            <Image
                                key={index}
                                src={comment.author.image}
                                alt={`user_${index}`}
                                width={24}
                                height={24}
                                className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                            />
                        ))}

                        <Link href={`/thread/${id}`}>
                            <p className='mt-1 text-subtle-medium text-gray-1'>
                                {comments.length} comment{comments.length > 1 ? "s." : "."}
                            </p>
                        </Link>
                    </div>
                )}

                {isComment && comments.length > 0 && (
                    <div className='ml-1 mt-3 flex items-center gap-2'>
                        {comments.slice(0, 2).map((comment, index) => (
                            <Image
                                key={index}
                                src={comment.author.image}
                                alt={`user_${index}`}
                                width={24}
                                height={24}
                                className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                            />
                        ))}

                        <Link href={`/thread/${id}`}>
                            <p className='mt-1 text-subtle-medium text-gray-1'>
                                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                            </p>
                        </Link>
                    </div>
                )}

                {/* {author.id === currentUserId && (
                <ActionsMenu />
            )} */}


                {!isComment && community && (
                    <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                        <p className='text-subtle-medium text-gray-1'>
                            {formatDateString(createdAt)}
                            - {" "} {community.name} Community
                        </p>

                        <Image
                            src={community.image}
                            alt={community.name}
                            width={14}
                            height={14}
                            className="ml-1 rounded-full object-cover"
                        />
                    </Link>
                )}
            </article>
            {!isComment && <hr className="border-t border-gray-800 overflow-x-hidden my-2 w-screen md:hidden -mx-6" />}
        </>
    )
}

export default ThreadCard;