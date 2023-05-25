import NextAuth, {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {prisma} from "@/db";
import {User} from '@prisma/client'
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {label: "E-mail", type: "text", placeholder: "Your email"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials): Promise<User | null> {
                console.log('hello??')
                if (!credentials?.password || !credentials?.email) return null
                const userWithEmail = await prisma.user.findFirst({where: {email: credentials.email}})
                console.log(userWithEmail)
                if (!userWithEmail || !(await bcrypt.compare(credentials.password, userWithEmail.hashedPassword))) return null
                return userWithEmail
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        redirect: async ({url, baseUrl}) => {
            return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl)
        }
    },
    session: {
        strategy: "jwt"
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}