interface ApiComment {
    id: string;
    text: string;
    author: {
        nickname: string;
    };
    _count: {
        responses: number;
    }
}

export async function getComments(postId: string, commentId?: string): Promise<ApiComment[]> {
    const query = commentId ? `/?commentId=${commentId}` : ""
    const result = await fetch(`/api/comments/${postId}${query}`);
    if (!result.ok) throw new Error("Failed to fetch comments")
    return result.json()
}