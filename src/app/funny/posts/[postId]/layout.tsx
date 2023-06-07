import {ReactNode} from "react";

export default function Layout(props: {
    comments: ReactNode,
    children: ReactNode,
}) {
    return (
        <>
            {props.children}
            {props.comments}
        </>
    )
}