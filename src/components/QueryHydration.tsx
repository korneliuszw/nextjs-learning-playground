import {Hydrate, HydrateProps} from "@tanstack/react-query";

export default function QueryHydration(props: HydrateProps) {
    return <Hydrate {...props}/>
}