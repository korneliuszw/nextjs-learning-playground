'use client'

// import {addPost} from "@/actions/post";
import Input from "@/components/Input";
import {FormEvent} from "react";
import {useAction} from "next-safe-action/hook";
import {addPost} from "@/actions/post";
import FormStatus from "@/components/FormStatus";

export default function AddPost() {
    const {execute, res} = useAction(addPost)
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        execute({
            title: formData.get('title') as string,
            description: formData.get('description') as string
        })
        form.reset()
    }
    return <form onSubmit={onSubmit}>
        <FormStatus validationFieldMap={{title: "Post title", description: "Post description"}}
                    result={res} successMessage={"Created!"}/>
        <Input label={"Post title"} name={"title"} type={"text"}/>
        <Input label={"Post description"} name={"description"} type={"text"}/>
        <button type="submit" className={"btn btn-primary"}>Add</button>
    </form>
}