import {prisma} from "@/db";
import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import {commentSelect} from "@/app/api/comments/[postId]/route";
import {revalidatePath} from "next/cache";
import {getToken} from "next-auth/jwt";

interface CreateCommentParams {
    params: {
        postId: string
    }
}


const replySchema = z.object({
    commentThreadId: z.string().uuid().optional(),
    text: z.string()
})

export type CreateCommentBody = z.infer<typeof replySchema>

export async function POST(req: NextRequest, {params: {postId}}: CreateCommentParams) {
    const session = await getToken({
        req
    })
    const data = await replySchema.parseAsync(await req.json())

    const created = await prisma.comment.create({
        data: {
            text: data.text,
            responseTo: !data.commentThreadId ? undefined : {
                connect: {
                    id: data.commentThreadId
                }
            },
            entry: {
                connect: {
                    id: postId
                }
            },
            author: {
                connect: {
                    id: session?.sub
                }
            }
        },
        select: commentSelect
    })
    const commentIdQuery = data.commentThreadId ? `?commentId=${data.commentThreadId}` : ""
    revalidatePath(`/api/comments/${postId}${commentIdQuery}`)
    return NextResponse.json(created, {status: 201})
}