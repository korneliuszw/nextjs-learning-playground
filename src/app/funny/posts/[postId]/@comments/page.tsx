import {prisma} from "@/db";
import {Reply} from "@/components/Comment/Reply";
import {DetailedPostProps} from "@/app/funny/posts/[postId]/page";
import {Comment} from "@/components/Comment/Comment";

export default async function Comments({params: {postId}}: DetailedPostProps) {
    const comments = await prisma.comment.findMany({
        select: {
            id: true,
        },
        where: {
            responseTo: null
        }
    })
    return <>
        <Reply postId={postId}/>
        {comments.map(comment => <Comment
            commentId={comment.id} postId={postId} key={comment.id}/>)}
    </>
}