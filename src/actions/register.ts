"use server"

import {prisma} from "@/db";
import {z} from "zod";
import {action} from "@/action";
import bcrypt from 'bcrypt'

if (!process.env.SALT_ROUNDS || isNaN(Number(process.env.SALT_ROUNDS))) console.debug('Using default 10 salt rounds for hashing passwords')

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    nickname: z.string().min(4)
})

export const register = action({input: registerSchema}, async ({email, password, nickname}) => {
    console.log('huj')
    const existentUser = await prisma.user.findFirst({where: {email}})
    console.log(existentUser)
    if (existentUser) return {
        error: {
            reason: "user_exists"
        }
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) ?? 10)
    await prisma.user.create({
        data: {
            email,
            hashedPassword,
            nickname
        }
    })
    return {
        success: true
    }
})