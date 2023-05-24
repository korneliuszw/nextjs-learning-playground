import Image from "next/image";
import logo from '../assets/next.svg'
import ActiveLink from "@/components/Header/ActiveLink";
import SignInButton from "@/components/Header/SignInButton";

export default function Header() {
    const urls = [{
        url: '/',
        name: 'Home'
    }, {
        url: '/funny',
        name: 'Funny page'
    }, {
        url: '/funny/posts',
        name: 'Posts'
    }]
    return (
        <div className={"flex gap-1 my-2"}>
            <Image src={logo} alt={"Our logo"} color={"white"}/>
            <ul className={"menu bg-base-100 flex-row self-center"}>
                {urls.map(path => (<li key={path.url}><ActiveLink href={path.url} name={path.name}/></li>))}
            </ul>
            <SignInButton/>
        </div>
    )
}