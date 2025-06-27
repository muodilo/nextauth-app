import { useEffect } from "react"
import { useSession } from "next-auth/react"
import Hero from "@/components/hero"

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      console.log("Logged in user:", session.user)
    } else {
      console.log("No user is logged in.")
    }
  }, [session])

  return (
    <div className="text-center pt-16 lg:px-32">
      <Hero/>
    </div>
  )
}
