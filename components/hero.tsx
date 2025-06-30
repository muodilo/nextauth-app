import React from "react";
import Link from "next/link";
import { useSession} from "next-auth/react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { status } = useSession();
  return (
    <div className="relative h-[75vh] rounded-3xl overflow-hidden bg-cover bg-center bg-[url('/images/heroImage.png')]">
      <div className="absolute inset-0 bg-black/40 flex items-end justify-center">
        <div className="text-center text-white px-4 space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Acme Co</h1>
          <p className="mt-4 text-lg md:text-xl">Your frendly dashboard</p>
          <div className="mb-10">
            {status !== "authenticated" && (
              <div className="flex justify-center gap-3">
                <Link href="/register">
                  <Button className="rounded-full" variant="customSubmit">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full text-black "
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
