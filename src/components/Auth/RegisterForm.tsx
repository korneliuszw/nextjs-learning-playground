"use client"

import {FormEvent, ReactNode, useLayoutEffect} from "react";
import {useAction} from "next-safe-action/hook";
import {register} from "@/actions/register";
import {useRouter} from "next/navigation";

const serverErrorMap = {
    'user_exists': 'This e-mail address is already associated with a user'
}

export const RegisterForm = ({children}: { children: ReactNode }) => {
    const {execute, res, isExecuting} = useAction(register)
    const router = useRouter()
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (isExecuting) return
        const formData = new FormData(event.target as HTMLFormElement) // Minimize use of states to SSG as much as possible
        const email = formData.get('email') as string | null
        const password = formData.get('password') as string | null
        const nickname = formData.get('nickname') as string | null
        if (!email || !password || !nickname) return // Let HTML handle required inputs
        execute({email, password, nickname})
    }
    useLayoutEffect(() => {
        if (!res?.data?.success) return
        const timeout = setTimeout(() => {
            router.push('/auth/login')
        }, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [res, router])
    return (
        <>
            {isExecuting && <div>Processing your request</div>}
            {res?.data?.success &&
                <div className={"alert alert-success shadow-lg"}>Your account has been created. You will be redirect to
                    login page in 5 seconds.</div>}
            {(res?.validationError || res?.serverError || res?.data?.error) &&
                <div className={"alert alert-error shadow-lg flex-col"}>
                    {res.validationError && res.validationError.nickname &&
                        <div>Nickname: {res.validationError.nickname.join(', ')}</div>}
                    {res.validationError && res.validationError.password &&
                        <div>Password: {res.validationError.password.join(', ')}</div>}
                    {res.validationError && res.validationError.email &&
                        <div>Email: {res.validationError.email.join(', ')}</div>}
                    {res.serverError && <div>Something went wrong with your request</div>}
                    {res.data?.error && <div>{serverErrorMap[res.data.error.reason] ?? "Unknown error"}</div>}
                </div>}
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                {children}
            </form>
        </>
    )
}