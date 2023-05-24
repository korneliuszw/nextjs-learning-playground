import {createSafeActionClient} from "next-safe-action";
import {getServerSession} from "next-auth";

export const action = createSafeActionClient({
    getAuthData: async () => {
        const session = await getServerSession()
        console.log(session)
        if (!session?.user) throw new Error("Not logged in")
        return session.user
    }
})