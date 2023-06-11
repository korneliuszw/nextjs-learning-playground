import {ApiComment} from "@/app/api/comments/[postId]/route";

export async function getComments(postId: string, commentId?: string): Promise<ApiComment[]> {
    const query = commentId ? `/?commentId=${commentId}` : ""
    const result = await fetch(`http://localhost:3000/api/comments/${postId}${query}`);
    if (!result.ok) throw new Error("Failed to fetch comments")
    return result.json()
}