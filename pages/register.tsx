import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/schemas"
import { supabase } from "@/lib/supabase"
import { toast } from "react-toastify"
import { useState } from "react"
import Link from "next/link"

type RegisterSchemaType = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (form: RegisterSchemaType) => {
    setLoading(true)

    const role = form.email.endsWith("@gmail.com") ? "user" : "admin"

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          fullName: form.fullName,
          role,
        },
      },
    })

    setLoading(false)

    if (error) {
      toast.error(`Registration failed: ${error.message}`)
    } else {
      toast.success("Account created. Please log in.")
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-svh flex-col lg:px-72 justify-center px-4 ">
        <h1 className="text-center text-2xl font-bold">Create an Account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl p-6 "
      >

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button variant='customSubmit' type="submit" className="w-full rounded-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      <Link className="w-full text-center " href={'/login'}><Button className="text-neutral-500" variant='link'>Already have an account? Sign in</Button></Link>
      
    </div>
  )
}
