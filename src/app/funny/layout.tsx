import styles from './layout.module.css'
import Header from "@/components/Header/Header";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className={`grid ${styles.dashboard}`}>
            <div className={`mx-auto ${styles.header} h-fit`}>
                <Header/>
            </div>
            <div className={`mx-auto w-1/3 ${styles.nav}`}>
                Hello
            </div>
            <div className={`container mx-auto ${styles.main}`}>
                {children}
            </div>
        </div>
    )
}
