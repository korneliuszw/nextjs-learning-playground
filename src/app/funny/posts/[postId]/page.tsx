import {prisma} from "@/db";
import {notFound} from "next/navigation";

export interface DetailedPostProps {
    params: {
        postId: string
    }
}

export default async function Post({params: {postId}}: DetailedPostProps) {
    const post = await prisma.entry.findFirst({where: {id: postId}})
    console.log(post)
    if (!post) notFound()
    return <div>Post {post?.title}</div>
}