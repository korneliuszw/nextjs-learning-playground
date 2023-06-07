"use client"

import {useAction} from "next-safe-action/hook";
import {reply} from "@/actions/comments";
import {useState} from "react";

interface ReplyProps {
    commentThreadId?: string;
    postId: string;
}

export function Reply({commentThreadId, postId}: ReplyProps) {
    const {execute} = useAction(reply)
    const [replyText, setReplyText] = useState<string | undefined>(undefined)
    const submitReply = () => {
        if (replyText)
            execute({
                commentThreadId,
                postId,
                text: replyText
            })
    }
    return <div className={"flex"}>
        <textarea placeholder={"Reply"} className={"textarea-primary"} value={replyText}
                  onChange={(value) => setReplyText(value.target.value)}/>
        <button type={"button"} className={"btn btn-primary"} onClick={submitReply}>Reply</button>
    </div>
}