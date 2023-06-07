import Link from "next/link";
import {Reply} from "@/components/Comment/Reply";

interface CommentProps {
    authorName: string;
    text: string;
    hasResponses?: boolean
    commentId: string;
    postId: string;
}

export function Comment({authorName, text, hasResponses, commentId, postId}: CommentProps) {
    return <div className={"border-l-1 border-accent px-2 py-1 flex flex-col"}>
        <div className={"text-sm text-secondary"}>{authorName}</div>
        <div className={"text-primary leading-relaxed"}>{text}</div>
        {hasResponses && <div className={"link-accent"}>
            <Link href={`/funny/posts/threads/${commentId}`}>See replies</Link>
        </div>}
        <Reply postId={postId} commentThreadId={commentId}/>
    </div>
}