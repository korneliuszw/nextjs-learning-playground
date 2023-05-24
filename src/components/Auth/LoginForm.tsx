"use client"

import {FormEvent, ReactNode} from "react";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";


export default function LoginForm({children}: { children: ReactNode }) {
    const params = useSearchParams()
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            callbackUrl: params.get('callbackUrl') ?? '/'
        })
    }
    return <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
        {params.has('error') &&
            <div className={"alert alert-error shadow-lg"}>
                <div>{params.get("error") === "CredentialsSignin" ? "Wrong e-mail or password" : "Something wrong has happened"}</div>
            </div>}
        {children}
    </form>
}