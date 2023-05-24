'use client'
import {Entry} from "@prisma/client";
import {useTransition} from "react";
import {removePost} from "@/actions/post";


interface IPost {
    post: Entry
}

export default function Post({post}: IPost) {
    const [_, startTransition] = useTransition()
    return <div className={"card"}>
        <div className={"card-body"}>
            <div className={"card-title"}>{post.title}</div>
            <p>{post.description}</p>
            <div className={"card-actions"}>
                <button className={"btn btn-accent"} onClick={() => {
                    startTransition(() => removePost(post.id))
                }}>
                    Remove
                </button>
            </div>
        </div>
    </div>
}