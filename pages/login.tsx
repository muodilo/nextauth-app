import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    setLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl:  `${window.location.origin}/`});
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-xl "
      >
        <h1 className="text-center text-2xl font-bold">Welcome back</h1>

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

        <Button
          variant="customSubmit"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Signin"}
        </Button>

        <div className="text-center text-sm text-gray-500">or</div>

        <div className="flex justify-between flex-col gap-4">
          <Button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex-1"
            variant="outline"
          >
            <FcGoogle />
            Continue With Google
          </Button>
          <Button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex-1"
            variant="outline"
          >
            <FaGithub />
            Continue With GitHub
          </Button>
        </div>
      </form>
      <Link className="w-full text-center " href={"/register"}>
        <Button className="text-neutral-500 text-center" variant="link">
          Don&apos;t have an account? Sign Up
        </Button>
      </Link>
    </div>
  );
}
