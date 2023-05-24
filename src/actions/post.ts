'use server'
import {prisma} from "@/db";
import {revalidatePath} from "next/cache";

export async function removePost(postId: string) {
    await prisma.entry.delete({where: {id: postId}})
    revalidatePath('/funny/posts')
}

// const addPostSchema = z.object({
//     title: z.string().min(5),
//     description: z.string().min(2)
// })
// export const addPost = action({input: addPostSchema, withAuth: true}, async ({title, description}: { user }) => {
//     await prisma.entry.create({
//         data: {
//             title,
//             description
//         }
//     })
//     revalidatePath('/funny/posts')
// })