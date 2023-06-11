import {Reply} from "@/components/Comment/Reply";
import {DetailedPostProps} from "@/app/funny/posts/[postId]/page";
import {dehydrate, Hydrate, QueryClient} from "@tanstack/react-query";
import {Comment} from "@/components/Comment/Comment";
import {getCommentsServer} from "@/app/api/comments/[postId]/route";
import {Suspense} from "react";


export default async function Comments({params: {postId}}: DetailedPostProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['comments', {
        postId,
        commentId: undefined
    }], () => getCommentsServer(postId, null))
    const dehydrated = dehydrate(queryClient)
    return <>
        <Reply postId={postId}/>
        <Hydrate state={dehydrated}>
            <Suspense fallback={<h1>Loading comments...</h1>}>
                <Comment postId={postId} key={"TOP"}/>
            </Suspense>
        </Hydrate>
    </>
}