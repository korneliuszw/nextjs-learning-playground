import {Entry} from "@prisma/client";
import RemovePostButton from "@/components/Post/RemovePostButton";
import Link from "next/link";


interface IPost {
    post: Entry
}

export default function PostSummary({post}: IPost) {
    return <div className={"card"}>
        <div className={"card-body"}>
            <div className={"card-title"}>{post.title}</div>
            <p>{post.description}</p>
            <Link className={"link"} href={`/funny/posts/${post.id}`}>Read full</Link>
            <div className={"card-actions"}>
                <RemovePostButton postId={post.id}/>
            </div>
        </div>
    </div>
}