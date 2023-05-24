import Image from 'next/image'
import {Metadata} from "next";
import ModalOpener from "@/components/ModalOpener";
import haruhi from './haruhi.png'

export const metadata: Metadata = {
    title: "heck!",
    description: "this isn't funny"
}


export default function FunnyPage() {
    return (
        <>
            <h1>I am not laughing tho wrr</h1>
            <div className="card w-96 h-15 bg-base-100 shadow-xl m-auto">
                <figure>
                    <Image src={haruhi} alt="Haruhi pen mustache"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Haruhi!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <ModalOpener buttonText={"Buy now!"} title={"Confirm"}
                                     action={(<div className={"btn-group"}>
                                         <label className={"btn btn-primary"} htmlFor={"modal"}>Yes</label>
                                         <label className={"btn btn-accent"} htmlFor={"modal"}>No</label>
                                     </div>)}>
                            Are you sure?
                        </ModalOpener>
                    </div>
                </div>
            </div>
        </>
    )
}