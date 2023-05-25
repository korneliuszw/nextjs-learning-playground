'use server'
import {prisma} from "@/db";
import {revalidatePath} from "next/cache";
import {action} from "@/action";
import {z} from "zod";

export async function removePost(postId: string) {
    await prisma.entry.delete({where: {id: postId}})
    revalidatePath('/funny/posts')
}

const addPostSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(2)
})
export const addPost = action({input: addPostSchema, withAuth: true},
    async ({title, description}, {userId}) => {
        await prisma.entry.create({
            data: {
                title,
                description,
                author: {
                    connect: {
                        id: userId
                    }
                }
            },
        })
        revalidatePath('/funny/posts')
    })