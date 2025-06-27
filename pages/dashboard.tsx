import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Users, Shield } from "lucide-react";

interface DashboardProps {
  name: string;
  email: string;
  role: string;
}

export default function Dashboard({ name, email, role }: DashboardProps) {
  return (
    <div className="md:px-32 pt-12 ">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </header>

      <h2 className="text-lg font-semibold mb-4">User Information</h2>
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border-t pt-4 space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p>{name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p>{role}</p>
            </div>
          </div>
        </div>
        <div className="pt-10 md:pt-0">
          <div className="border-t pt-4 space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm cursor-pointer hover:underline">
            <Users className="h-4 w-4" />
            <span>Manage Users</span>
          </div>
          <div className="flex items-center gap-2 text-sm cursor-pointer hover:underline">
            <Shield className="h-4 w-4" />
            <span>Manage Roles</span>
          </div>
        </div>

        <div className="mt-8 ">
          <Button className="rounded-full" variant="secondary" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </section>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  interface CustomSessionUser {
    name?: string | null;
    email?: string | null;
    role?: string;
  }

  const user = session.user as CustomSessionUser;

  return {
    props: {
      name: user.name || "Unknown",
      email: user.email || "No email",
      role: user.role || "user",
    },
  };
};

