"use client"

import {Reply} from "@/components/Comment/Reply";
import {useQuery} from "@tanstack/react-query";
import {getComments} from "@/apiActions/comments";
import {Suspense, useCallback, useMemo, useState} from "react";
import {getNumberOfPages} from "@/utils/paginationClient";
import {COMMENTS_PER_PAGE} from "@/constants/pagination";

export const DEFAULT_DEPTH = 2

interface CommentProps {
    commentId?: string;
    postId: string;
    depth?: number;
}

export function Comment({commentId, postId, depth = 0}: CommentProps) {
    const [page, setPage] = useState(1)

    const changePage = useCallback((relativePage: number) => {
        setPage(page => page + relativePage)
    }, [])

    const [shouldFetch, setShouldFetch] = useState(depth < DEFAULT_DEPTH)

    const {data: comments} = useQuery(['comments', {
        postId,
        commentId
    }], () => getComments(postId, page, commentId), {
        useErrorBoundary: true,
        keepPreviousData: true,
        enabled: shouldFetch,
    })

    const totalPages = useMemo(() => getNumberOfPages(comments?.total ?? 0, COMMENTS_PER_PAGE), [comments])

    return <>
        {!shouldFetch && <button onClick={() => setShouldFetch(true)}>Load comments</button>}
        {comments?.comments?.map(comment => (
            <div key={comment.id} className={"border-l-1 border-l border-accent px-2 m-2 mb-4 flex flex-col"}>
                <div className={"text-sm text-secondary"}>{comment.author.nickname}</div>
                <div className={"text-primary leading-relaxed"}>{comment.text}</div>
                <Reply postId={postId} commentThreadId={commentId}/>
                <Suspense fallback={<h1>Loading comments...</h1>}>
                    {comment._count.responses > 0 &&
                        <Comment postId={postId} commentId={comment.id} key={commentId} depth={depth + 1}/>}
                </Suspense>
            </div>))}
        {totalPages > 1 && <div className={"pagination flex gap-2"}>
            {page > 1 && <div onClick={() => changePage(-1)}>Previous page</div>}
            <div>Page: {page}</div>
            {page < totalPages && <div onClick={() => changePage(+1)}>Next page</div>}
        </div>}
    </>
}