import {Reply} from "@/components/Comment/Reply";
import {DetailedPostProps} from "@/app/funny/posts/[postId]/page";
import {getComments} from "@/apiActions/comments";
import {dehydrate, Hydrate, QueryClient} from "@tanstack/react-query";
import {Comment} from "@/components/Comment/Comment";


export default async function Comments({params: {postId}}: DetailedPostProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['comments', {
        postId,
        commentId: null
    }], () => getComments(postId))
    const dehydrated = dehydrate(queryClient)
    return <>
        <Reply postId={postId}/>
        <Hydrate state={dehydrated}>
            <Comment postId={postId} key={"TOP"}/>
        </Hydrate>
    </>
}