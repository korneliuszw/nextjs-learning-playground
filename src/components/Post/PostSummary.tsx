import {Entry} from "@prisma/client";
import RemovePostButton from "@/components/Post/RemovePostButton";


interface IPost {
    post: Entry
}

export default function PostSummary({post}: IPost) {
    return <div className={"card"}>
        <div className={"card-body"}>
            <div className={"card-title"}>{post.title}</div>
            <p>{post.description}</p>
            <div className={"card-actions"}>
                <RemovePostButton postId={post.id}/>
            </div>
        </div>
    </div>
}