import {ApiComment} from "@/app/api/comments/[postId]/route";
import {CreateCommentBody} from "@/app/api/comments/[postId]/create/route";

export async function getComments(postId: string, commentId?: string): Promise<ApiComment[]> {
    const query = commentId ? `/?commentId=${commentId}` : ""
    const result = await fetch(`http://localhost:3000/api/comments/${postId}${query}`);
    if (!result.ok) throw new Error("Failed to fetch comments")
    return result.json()
}

export async function createReply(text: string, postId: string, commentThreadId?: string): Promise<ApiComment> {
    const body: CreateCommentBody = {
        commentThreadId,
        text
    }
    const result = await fetch(`http://localhost:3000/api/comments/${postId}/create`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (result.status !== 201) throw new Error('Failed to post a comment')
    return await result.json()
}