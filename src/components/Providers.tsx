'use client'

import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

export default function Providers({children}: { children: React.ReactNode }) {
    const [client] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5000,
                suspense: true
            }
        }
    }))
    return <SessionProvider>
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    </SessionProvider>
}