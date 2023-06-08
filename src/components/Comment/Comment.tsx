import {Reply} from "@/components/Comment/Reply";
import {prisma} from "@/db";

interface CommentProps {
    commentId: string;
    postId: string;
}

export async function Comment({commentId, postId}: CommentProps) {
    const comment = await prisma.comment.findFirstOrThrow({
        where: {
            id: commentId
        },
        select: {
            text: true,
            responses: {
                select: {
                    id: true
                }
            },
            author: {
                select: {
                    nickname: true
                }
            },
        },
    })

    return <div className={"border-l-1 border-l border-accent px-2 m-2 mb-4 flex flex-col"}>
        <div className={"text-sm text-secondary"}>{comment.author.nickname}</div>
        <div className={"text-primary leading-relaxed"}>{comment.text}</div>
        <Reply postId={postId} commentThreadId={commentId}/>
        {comment.responses.map(response => <Comment commentId={response.id} postId={postId} key={response.id}/>)}
    </div>
}