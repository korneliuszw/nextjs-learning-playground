'use client'

// import {addPost} from "@/actions/post";
import Input from "@/components/Input";
import {useSession} from "next-auth/react";

export default function AddPost() {
    const {status} = useSession()
    if (status !== "authenticated") <span>To post a comment, you must login first</span>
    return <form>
        <Input label={"Post title"} name={"title"} type={"text"}/>
        <Input label={"Post description"} name={"description"} type={"text"}/>
        <button type="submit" className={"btn btn-primary"}>Add</button>
    </form>
}