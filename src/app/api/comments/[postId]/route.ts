import {prisma} from "@/db";
import {NextRequest, NextResponse} from "next/server";

interface GetCommentParams {
    params: {
        postId: string
    }
}

export async function GET(request: NextRequest, {params: {postId}}: GetCommentParams) {
    const parentCommentId = request.nextUrl.searchParams.get('commentId')
    console.log(request.nextUrl.searchParams.entries())
    console.log(postId)
    const comments = await prisma.comment.findMany({
        select: {
            id: true,
            text: true,
            author: {
                select: {
                    nickname: true
                }
            },
            _count: {
                select: {
                    responses: true
                }
            }
        },
        where: {
            responseTo: parentCommentId ? {
                id: parentCommentId!
            } : undefined
        }
    })
    console.log(comments)
    return NextResponse.json(comments)
}