'use server'
import {prisma} from "@/db";
import {revalidatePath} from "next/cache";
import {action} from "@/action";
import {z} from "zod";

const removePostSchema = z.object({
    id: z.string().uuid()
})

export const removePost = action({input: removePostSchema, withAuth: true},
    async ({id}, {userId}) => {
        await prisma.entry.deleteMany({
            where: {
                id,
                authorId: userId
            }
        })
        revalidatePath('/funny/posts')
    })

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