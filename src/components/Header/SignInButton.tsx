'use client'
import {signIn, signOut, useSession} from "next-auth/react";

export default function SignInButton() {
    const {data: session} = useSession()
    if (session && session.user) return <div className={"btn"} onClick={() => signOut()}>Sign out</div>
    return <div className={"btn"} onClick={() => signIn()}>
        Sign In
    </div>
}