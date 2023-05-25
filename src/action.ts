import {createSafeActionClient} from "next-safe-action";
import {cookies, headers} from "next/headers";
import {getToken} from "next-auth/jwt";


export const action = createSafeActionClient({
    getAuthData: async () => {
        const session = await getToken({
            req: {
                headers: await headers(),
                cookies: await cookies() // @ts-ignore
            }
        }) // Workaround for getServerSession() bug
        if (!session?.sub) throw new Error("Not logged in")
        return {email: session.email, userId: session.sub}
    }
})