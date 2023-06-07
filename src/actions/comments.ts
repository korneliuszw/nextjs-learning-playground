'use server'

import {z} from "zod";
import {action} from "@/action";
import {revalidatePath} from "next/cache";
import {prisma} from "@/db";

const replySchema = z.object({
    commentThreadId: z.string().uuid().optional(),
    postId: z.string().uuid(),
    text: z.string()
})

export const reply = action({input: replySchema, withAuth: true},
    async ({commentThreadId, postId, text}, {userId}) => {
        await prisma.comment.create({
            data: {
                text,
                responseTo: !commentThreadId ? undefined : {
                    connect: {
                        id: commentThreadId
                    }
                },
                entry: {
                    connect: {
                        id: postId
                    }
                },
                author: {
                    connect: {
                        id: userId
                    }
                }
            },
        },)
        revalidatePath(`/funny/posts/${postId}`)
    })