import {prisma} from "@/db";
import {NextRequest, NextResponse} from "next/server";
import {pageCalculateSkip, requestGetPage} from "@/utils/pagination";
import {COMMENTS_PER_PAGE} from "@/constants/pagination";


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

export interface GetCommentResponse {
    comments: ApiComment[],
    total: number
}

export const commentSelect = {
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
}


export async function getCommentsServer(postId: string, parentCommentId: string | null, skip: number = 0, take: number = COMMENTS_PER_PAGE): Promise<GetCommentResponse> {
    const where = {
        responseTo: parentCommentId ? {
            id: parentCommentId!
        } : null
    }
    const transactionArray = [prisma.comment.findMany({
        select: commentSelect,
        where,
        skip,
        take
    }), prisma.comment.count({
        where
    })
    ]
    const [comments, total] = await prisma.$transaction(transactionArray)
    return {
        comments: comments as ApiComment[],
        total: total as number
    }
}

export async function GET(request: NextRequest, {params: {postId}}: GetCommentParams) {
    const parentCommentId = request.nextUrl.searchParams.get('commentId')
    const skip = pageCalculateSkip(requestGetPage(request), COMMENTS_PER_PAGE)
    const comments = await getCommentsServer(postId, parentCommentId, skip)
    return NextResponse.json(comments)
}