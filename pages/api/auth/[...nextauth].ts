import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { supabase } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password
        if (!email || !password) return null

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error || !data.user) return null

        return {
          id: data.user.id,
          email: data.user.email,
          role: data.user.user_metadata?.role || "user",
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && "role" in user) {
        token.role = (user as any).role
      }

      if (account && account.provider !== "credentials") {
        const email = token.email ?? ""
        token.role = email.endsWith("@gmail.com") ? "user" : "admin"
      }

      return token
    },

    async session({ session, token }) {
      if (session.user && token?.role) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export default handler
