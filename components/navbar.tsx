import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="py-3 bg-white z-20 lg:px-32 md:px-16 px-5 border-b flex justify-between items-center fixed top-0 right-0 left-0">
      <h1 className="text-xl font-semibold">
        <Link href="/">Acme Co</Link>
      </h1>

      <nav className="space-x-4 flex items-center">
        {session?.user?.role === "user" && (
          <Link href="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
        )}
        {session?.user?.role === "admin" && (
          <Link href="/admin" className="hover:text-blue-500">
            Admin
          </Link>
        )}
        {session?.user?.image && (
          <Avatar>
            <AvatarImage src={session?.user?.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        {status === "authenticated" ? (
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        ) : (
            <div className="flex gap-3">
          <Link href="/register">
            <Button className="rounded-full" variant='customSubmit' >Register</Button>
          </Link>
          <Link href="/login">
            <Button variant='outline' className="rounded-full " >Login</Button>
          </Link>

            </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
