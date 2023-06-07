import {Entry} from "@prisma/client";
import {prisma} from "@/db";
import PostSummary from "@/components/Post/PostSummary";
import AddPost from "@/components/AddPost";

async function getPosts(): Promise<Entry[]> {
    return await prisma.entry.findMany()
}

export default async function Posts() {
    const posts = await getPosts();
    return (
        <>
            {posts.map(post => <PostSummary post={post} key={post.id}/>)}
            <AddPost/>
        </>
    )
}