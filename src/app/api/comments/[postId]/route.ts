import {prisma} from "@/db";
import {NextRequest, NextResponse} from "next/server";

export interface ApiComment {
    id: string;
    text: string;
    author: {
        nickname: string;
    };
    _count: {
        responses: number;
    }
}


interface GetCommentParams {
    params: {
        postId: string
    }
}

export function getCommentsServer(postId: string, parentCommentId: string | null): Promise<ApiComment[]> {
    return prisma.comment.findMany({
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
            } : null
        }
    })
}

export async function GET(request: NextRequest, {params: {postId}}: GetCommentParams) {
    const parentCommentId = request.nextUrl.searchParams.get('commentId')
    const comments = await getCommentsServer(postId, parentCommentId)
    return NextResponse.json(comments)
}