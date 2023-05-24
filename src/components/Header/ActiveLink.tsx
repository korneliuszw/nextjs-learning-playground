"use client"


import Link from "next/link";
import {usePathname} from "next/navigation";

interface ActiveLinkProps {
    href: string;
    name: string
}

export default function ActiveLink({href, name}: ActiveLinkProps) {
    const pathname = usePathname()
    return <Link href={href} className={pathname == href ? "active" : ""}>{name}</Link>
}