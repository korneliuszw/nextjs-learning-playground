"use client"

import {Suspense, useCallback, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createReply} from "@/apiActions/comments";
import {GetCommentResponse} from "@/app/api/comments/[postId]/route";

interface ReplyProps {
    commentThreadId?: string;
    postId: string;
}

export function Reply({commentThreadId, postId}: ReplyProps) {
    const [replyText, setReplyText] = useState<string | undefined>(undefined)
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationKey: ['reply', {
            postId,
            commentThreadId
        }],
        mutationFn: (text: string) => createReply(text, postId, commentThreadId),
        onSuccess: (data) => {
            queryClient.setQueryData(['comments', {
                postId,
                commentId: commentThreadId
            }], (old?: GetCommentResponse) => {
                if (!old) return {total: 1, comments: [data]}
                return {
                    total: old.total + 1,
                    comments: [data, ...old.comments]
                }
            })
            setReplyText('')
        },
        useErrorBoundary: true
    })
    const submitReply = useCallback(() => {
        if (!replyText) return
        mutate(replyText)
    }, [replyText, mutate])

    return <div className={"flex"}>
        <Suspense fallback={"creating reply..."}>
            <textarea placeholder={"Reply"} className={"textarea-primary"} value={replyText}
                      onChange={(value) => setReplyText(value.target.value)}/>
            <button type={"button"} className={"btn btn-primary"} onClick={submitReply}>Reply</button>
        </Suspense>
    </div>
}