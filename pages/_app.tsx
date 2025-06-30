import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import MainLayout from "@/components/layout/MainLayout"
import "react-toastify/dist/ReactToastify.css"
import "@/styles/globals.css"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <ToastContainer position="top-right" autoClose={3000} />
    </SessionProvider>
  )
}
