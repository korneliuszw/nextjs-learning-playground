import {NextRequest} from "next/server";

export const requestGetPage = (request: NextRequest) => {
    const pageParam = request.nextUrl.searchParams.get('page')
    const page = pageParam ? parseInt(pageParam) : 1
    if (isNaN(page)) throw new Error("Page is not a number!")
    return page
}


export const pageCalculateSkip = (page: number, take: number) => {
    return (page - 1) * take
}