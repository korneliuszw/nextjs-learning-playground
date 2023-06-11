export {default} from "next-auth/middleware"

export const config = {matcher: ["/api/comments/:postId/create"]}