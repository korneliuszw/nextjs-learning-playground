import {Entry} from "@prisma/client";
import {prisma} from "@/db";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";

function getPosts(): Promise<Entry[]> {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const entries = await prisma.entry.findMany()
            resolve(entries)
        }, 5000)
    })
}


export default async function Posts() {
    const posts = await getPosts();
    return (
        <>
            {posts.map(post => <Post post={post} key={post.id}/>)}
            <AddPost/>
        </>
    )
}