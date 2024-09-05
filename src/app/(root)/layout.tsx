
import Navbar from "./_components/Navbar"

 export default function MainLayout({children}:{children:React.ReactNode}){
    return (<div className="h-full dark:bg-[#1f1f1f] bg-background"
    >
        <Navbar/>
   <main className="h-full pt-40">
    {children}
   </main>
    </div>

    )}