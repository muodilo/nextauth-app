import { ReactNode } from "react"
import Navbar from "../navbar"

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {

  return (
    <div className="h-svh flex flex-col">
    <Navbar/>
      <main className="flex-grow container mx-auto p-6">
        {children}   
    </main>
    </div>
  )
}
