"use client"

import {Reply} from "@/components/Comment/Reply";
import {useQuery} from "@tanstack/react-query";
import {getComments} from "@/apiActions/comments";
import {Suspense} from "react";

interface CommentProps {
    commentId?: string;
    postId: string;
}

export function Comment({commentId, postId}: CommentProps) {
    const {data: comments} = useQuery(['comments', {
        postId,
        commentId
    }], () => getComments(postId, commentId), {
        // useErrorBoundary: true,
    })

    return <>
        {comments?.map(comment => (
            <div key={comment.id} className={"border-l-1 border-l border-accent px-2 m-2 mb-4 flex flex-col"}>
                <div className={"text-sm text-secondary"}>{comment.author.nickname}</div>
                <div className={"text-primary leading-relaxed"}>{comment.text}</div>
                <Reply postId={postId} commentThreadId={commentId}/>
                <Suspense fallback={<h1>Loading comments...</h1>}>
                    {comment._count.responses > 0 && <Comment postId={postId} commentId={comment.id} key={commentId}/>}
                </Suspense>
            </div>))}
    </>
}