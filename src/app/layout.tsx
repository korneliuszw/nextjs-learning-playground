import './globals.css'
import {Inter} from 'next/font/google'
import Providers from "@/components/Providers";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme={"forest"}>
        <head>
            <meta name="viewport" content={"initial-scale=1, width=device-width, maximum-scale=1, minimum-scale=1"}/>
        </head>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
