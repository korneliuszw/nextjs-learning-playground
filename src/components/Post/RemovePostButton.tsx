"use client"

import {removePost} from "@/actions/post";
import {useAction} from "next-safe-action/hook";

interface RemovePostButtonProps {
    postId: string
}

export default function RemovePostButton({postId}: RemovePostButtonProps) {
    const {execute, isExecuting} = useAction(removePost)
    return <button className={`btn btn-accent ${isExecuting ? "btn-disabled" : ""}`} onClick={() => {
        execute({id: postId})
    }}>{isExecuting ? "Removing..." : "Remove"}</button>
}